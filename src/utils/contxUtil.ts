import { protocolFeeRate } from "@/constants/contx";
import { WorkCredential, WorkCredentialForm } from "@/interfaces";
import { FixedNumber } from "@ethersproject/bignumber";
import Web3 from "web3";

export const getWeiAmount = (value: string) => {
  return Web3.utils.toWei(
    FixedNumber.from(value).mulUnsafe(protocolFeeRate)._value
  );
};

export const castWCFromForm = (form: WorkCredentialForm): WorkCredential => {
  const {
    to,
    from,
    isPayer,
    summary,
    detail,
    deliverables,
    value,
    tokenSymbol,
    tokenDecimal,
    fiatValue,
    fiatSymbol,
    networkId,
    issuedTimestamp,
    txHash,
    deliverableHash,
    platform,
    relatedTxHashes,
    tags,
    genre,
    jobType,
    toSig,
    fromSig,
    toSigner,
    fromSigner,
    startTimestamp,
    endTimestamp,
    subtasks,
    createdAt,
    updatedAt,
    relatedAddresses,
  } = form;
  return {
    to,
    from,
    isPayer,
    summary,
    detail: detail || "",
    deliverables: deliverables || [],
    value,
    tokenSymbol,
    tokenDecimal,
    fiatValue: fiatValue || "",
    fiatSymbol: fiatSymbol || "",
    networkId,
    issuedTimestamp,
    txHash: txHash || "",
    deliverableHash: deliverableHash || "",
    platform: platform || "",
    relatedTxHashes: relatedTxHashes || [],
    tags: tags || [],
    genre: genre || "",
    jobType,
    toSig: toSig || "",
    fromSig: fromSig || "",
    toSigner: toSigner || "",
    fromSigner: fromSigner || "",
    startTimestamp: startTimestamp || "",
    endTimestamp: endTimestamp || "",
    subtasks: subtasks || [],
    createdAt: createdAt || "",
    updatedAt: updatedAt || "",
    relatedAddresses: relatedAddresses || [],
  };
};
