import { isETH } from "@/constants";
import {
  DeliverableItem,
  ModelTypes,
  WorkCredential,
  WorkCredentialForm,
} from "@/interfaces";
import {
  PaymentStatusType,
  useSetConnectWalletModal,
  useSetPaymentModal,
  useSetPaymentStatus,
} from "@/jotai/ui";
import { ERC20Service } from "@/services/Contracts/erc20";
import { getWCService } from "@/services/WorkCredential/WorkCredentialService";
import { makePaymentTxFn } from "@/utils/contractHelpers";
import { castWCFromForm, getWeiAmount } from "@/utils/contxUtil";
import { parseBigNumber } from "@/utils/ethersUtil";
import { genDeliverableHash } from "@/utils/hash";
import { isSupportedNetwork } from "@/utils/networks";
import { getToken } from "@/utils/tokenUtil";
import { convertDateToTimestampStr } from "@/utils/tools";
import { BigNumber } from "@ethersproject/bignumber";
import { Web3Provider } from "@self.id/multiauth";
import { useViewerRecord } from "@self.id/react";
import { useWeb3React } from "@web3-react/core";
import { useMyCeramicAcount } from "./useCeramicAcount";
import { useContracts } from "./useContract";
import { useToast } from "./useToast";
import { useWalletAccount } from "./useWalletAccount";

export const usePayment = () => {
  const { connectWallet, switchNetwork } = useWalletAccount();
  const { account, active, chainId } = useWeb3React<Web3Provider>();
  const { contxInfo, contxError } = useToast();
  const contracts = useContracts();
  const web3Context = useWeb3React();
  const runPaymentTxFn = makePaymentTxFn(web3Context, contracts);
  const setShow = useSetPaymentModal();
  const setPaymentStatus = useSetPaymentStatus();
  const setWalletModalShow = useSetConnectWalletModal();
  const { connectCeramic, mySelfID } = useMyCeramicAcount();
  const wcsRecord = useViewerRecord<ModelTypes, "workCredentials">(
    "workCredentials"
  );
  const wcService = getWCService();

  const execPayment = async (data: WorkCredentialForm) => {
    //=== validation===
    if (!formValidation(data)) {
      contxError("Form data is not valid");
      return;
    }

    if (!active) {
      setWalletModalShow(true);
      return;
    }

    if (!(account && chainId)) {
      contxError("Wallet Connection Error");
      return;
    }

    const selfID = mySelfID ?? (await connectCeramic());
    if (selfID == null || selfID.did == null) {
      contxError();
      return false;
    }
    if (!wcsRecord.isLoadable) {
      console.log("wcsRecord.isLoadable", wcsRecord.isLoadable);
      contxError();
      return false;
    }

    // check network
    const targetId = getToken(data.tokenSymbol)?.networkId || "1";
    if (!(contracts && isSupportedNetwork(chainId))) {
      await switchNetwork(Number(targetId)).catch((error) => {
        console.log("error", error);
        contxError();
        return false;
      });
      return;
    }

    if (chainId.toString() !== targetId) {
      await switchNetwork(Number(targetId)).catch((error) => {
        console.log("error", error);
        contxError();
        return false;
      });
    }
    //=== validation ===

    // show progress modal
    setShow(true);
    setPaymentStatus(PaymentStatusType.SavingDeliverables);

    try {
      //store data to ceramic
      const { wc, hash } = genWorkCredential(data, account, chainId);
      console.log({ wc });
      const doc = await selfID.client.dataModel.createTile("WorkCredential", {
        ...wc,
      });
      const wcs = wcsRecord.content?.WorkCredentials ?? [];
      const docUrl = doc.id.toUrl();
      await wcsRecord.set({
        WorkCredentials: [
          ...wcs,
          {
            id: docUrl,
            summary: wc.summary,
            isPayer: wc.isPayer,
            deliverables: wc.deliverables,
            isVerified: true,
            issuedTimestamp: wc.issuedTimestamp,
          },
        ],
      });

      // interact with contract
      const { tokenAddress } = data;
      setPaymentStatus(PaymentStatusType.executingTransaction);
      const amount = getWeiAmount(data.value);
      const payments = [
        {
          token: tokenAddress,
          amount: amount,
          dest: wc.to,
          deliverable: hash,
        },
      ];

      // ERC20 Token
      if (!isETH(tokenAddress)) {
        const signer = await web3Context.library.getSigner();
        const token = new ERC20Service(
          await web3Context.library,
          await signer.getAddress(),
          tokenAddress
        );
        await token.approve(
          contracts?.bulkPayment.address,
          BigNumber.from(amount)
        );
      }

      const tx = isETH(tokenAddress)
        ? await runPaymentTxFn((v) =>
            v.pay(payments, {
              value: amount,
            })
          ).catch(async (error) => {
            // revert
            console.log("error:reverted", error);
            const revertedWC = wcs.filter((w) => w.deliverableHash != hash);
            await wcsRecord.set({
              WorkCredentials: [...revertedWC],
            });
            return;
          })
        : await runPaymentTxFn((v) => v.pay(payments)).catch(async (error) => {
            // revert
            console.log("error:reverted", error);
            const revertedWC = wcs.filter((w) => w.deliverableHash != hash);
            await wcsRecord.set({
              WorkCredentials: [...revertedWC],
            });
            return;
          });
      if (!tx) {
        setPaymentStatus(PaymentStatusType.failed);
        return;
      }

      const receipt = await tx.wait();

      console.log("receipt", receipt);

      if (receipt.events && receipt.events.length > 0) {
        //listen events
        for (const event of receipt.events) {
          if (event?.event === "PaymentSent") {
            const dHash = event.args?.deliverable;
            console.log({ dHash });
            console.log({ hash });
            console.log("event.transactionHash", event.transactionHash);
            if (dHash == hash && !!event.transactionHash) {
              // make sig and update workcredentials
              setPaymentStatus(PaymentStatusType.issuingWorkCredential);
              const wcWithSig = await createSig(event.transactionHash, wc);
              await selfID.client.tileLoader.update(docUrl, {
                ...wcWithSig,
              });
              await wcsRecord.set({
                WorkCredentials: [
                  ...wcs,
                  {
                    id: docUrl,
                    summary: wc.summary,
                    isPayer: wc.isPayer,
                    txHash: wc.txHash,
                    deliverables: wc.deliverables,
                    fiatValue: wc.fiatValue,
                    isVerified: true,
                    issuedTimestamp: wc.issuedTimestamp,
                  },
                ],
              });
              setShow(false);
              setPaymentStatus(PaymentStatusType.issuedWorkCredential);
            }
          }
        }
      } else {
        console.log("workcredential generation failed...");
        setShow(false);
        setPaymentStatus(PaymentStatusType.finishedWithoutWorkCredential);
      }
    } catch (error) {
      console.log("error", error);
      console.log("workcredential generation failed...");
      setShow(false);
      setPaymentStatus(PaymentStatusType.Idling);
    }
  };

  const formValidation = (data: WorkCredentialForm): boolean => {
    return true;
  };

  const genWorkCredential = (
    data: WorkCredentialForm,
    from: string,
    networkId: number,
    isPayer: boolean = true,
    jobType: "FullTime" | "PartTime" | "OneTime" = "OneTime",
    platform: string = "contx"
  ): {
    wc: WorkCredential;
    hash: string;
  } => {
    const { summary, detail, deliverableCID, deliverableLink } = data;

    const now = convertDateToTimestampStr(new Date());

    let deliverables: DeliverableItem[] = [];
    if (deliverableLink)
      deliverables.push({ format: "url", value: deliverableLink });
    if (deliverableCID)
      deliverables.push({ format: "cid", value: deliverableCID });

    const hash = genDeliverableHash(now, summary, detail, deliverables);

    const wcForm: WorkCredentialForm = {
      ...data,
      value: parseBigNumber(data.value, data.tokenDecimal),
      to: data.to.toLowerCase(),
      deliverables: deliverables,
      from: from.toLowerCase(),
      networkId,
      isPayer,
      jobType,
      deliverableHash: hash,
      issuedTimestamp: now,
      platform,
    };
    const wc = castWCFromForm(wcForm);
    return { wc, hash };
  };

  const createSig = async (
    txHash: string,
    wc: WorkCredential
  ): Promise<WorkCredential> => {
    //get sig
    const deliverable = wc.deliverables
      ? wc.deliverables.map((d) => d.value).join(",")
      : undefined;
    const { signature, _ } = await getMessageHash(
      txHash,
      wc.from,
      wc.summary,
      wc.detail,
      deliverable
    );
    const nowTimestamp = convertDateToTimestampStr(new Date());
    const wcWithSig: WorkCredential = {
      ...wc,
      txHash: txHash,
      fromSig: signature,
      fromSigner: wc.from,
      updatedAt: nowTimestamp,
    };
    return wcWithSig;
  };

  const getMessageHash = async (
    tx: string,
    address: string,
    summary: string,
    description?: string,
    deliverable?: string
  ): Promise<{ [x: string]: any }> => {
    const { signature, hash } = await wcService.getMessageHash(
      tx,
      address,
      summary,
      description,
      deliverable
    );
    return { signature, hash };
  };

  return {
    execPayment,
  };
};
