import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export const getSignature = async (
  txHash: string,
  txAddress: string,
  summary: string,
  description?: string,
  deliverable?: string,
  provider?: Web3Provider
) => {
  if (!provider) throw "Missing provider for getSignature";

  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (txAddress.toLowerCase() !== address.toLowerCase())
    throw "Address is not match for getSignature";

  const messageForSign = getMessageForSignature(
    txHash,
    address.toLowerCase(),
    summary,
    description,
    deliverable
  );

  const signature = await new Promise<string>((resolve, reject) => {
    const t = setTimeout(
      () => reject("Waiting for signature, timed out."),
      60000
    );
    signer
      .signMessage(messageForSign)
      .then((sig) => {
        clearTimeout(t);
        resolve(sig);
      })
      .catch((e) => {
        reject(e);
      });
  });

  const byteCode = await provider.getCode(address);
  const isSmartContract =
    !!byteCode && ethers.utils.hexStripZeros(byteCode) !== "0x";
  const hash = isSmartContract ? ethers.utils.hashMessage(messageForSign) : "";

  return { signature, hash };
};

const getMessageForSignature = (
  txHash: string,
  txAddress: string,
  summary: string,
  description?: string,
  deliverable?: string
): string => {
  return `Claim Work Credential\n\nsummary: ${summary}\ndescription: ${
    description ?? ""
  }\ndeliverable: ${
    deliverable ?? ""
  }\ntxHash: ${txHash}\naddress: ${txAddress}`;
};
