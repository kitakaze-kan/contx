import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { ContractTransaction } from "ethers";
import { Contracts } from "@/services/Contracts/Contract";
import { BulkPayment } from "@/hardhat/typechain";

export const handleContractError = (e: any) => {
  if (e.code === 4001) {
    throw Error(`Transaction rejected by your wallet`);
  }
  throw Error(e);
};

export const makePaymentTxFn =
  (web3Context: Web3ReactContextInterface, contracts: Contracts | undefined) =>
  async (
    callback: (bulkPayment: BulkPayment) => Promise<ContractTransaction>
  ) => {
    if (!contracts) {
      console.log("Error: Contracts not loaded");
      return;
    }
    const signer = await web3Context.library.getSigner();
    const bulkPayment = contracts.bulkPayment.connect(signer);
    return callback(bulkPayment).catch((e) => handleContractError(e));
  };
