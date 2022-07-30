import { SponsorForm } from "@/interfaces";
import { useSetConnectWalletModal } from "@/jotai/ui";
import { connect } from "@tableland/sdk";
import { useToast } from "./useToast";
import { useWalletAccount } from "./useWalletAccount";

export const useCreateSponsor = () => {
  const { account, active, chainId } = useWalletAccount();
  const setWalletModalShow = useSetConnectWalletModal();
  const { contxInfo, contxError } = useToast();
  const create = async (data: SponsorForm) => {
    console.log({ data });

    //=== validation===
    if (!active) {
      setWalletModalShow(true);
      return;
    }

    if (!(account && chainId)) {
      contxError("Wallet Connection Error");
      return;
    }

    try {
      const { name, icon, fundAddress } = data;

      const fund = fundAddress || account;

      const res = await fetch(
        `/api/initializeSponsor?sponsor=${name}&ownerAddress=${account}&fundAddress=${fund}&icon=${
          icon || ""
        }`
      );
      console.log(res);
      contxInfo("Sponsor Account Created Successfully");
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    create,
  };
};
