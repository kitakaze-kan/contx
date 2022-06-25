import type { ModelTypeAliases } from "@glazed/types";
import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { AlsoKnownAs } from "@datamodels/identity-accounts-web";
import { CryptoAccountLinks } from "@datamodels/identity-accounts-crypto";

export type WorkCredential = {
  to: string; // payee address. maybe contract address
  from: string; // payer address. maybe contract address
  isPayer: boolean; // whether owner is payer or not
  summary: string; // work summary
  detail?: string; // work detail
  deliverables?: DeliverableItem[]; // deliberable link
  value: string; // reward value
  tokenSymbol: string; // eth, usdc, etc
  tokenDecimal: number;
  fiatValue?: string; //reward value as USD
  fiatSymbol?: string; // currently only USD supported
  networkId: number; // eth mainnet = 1 | polygon mainnet = 137
  issuedTimestamp: string; //block timestamp
  txHash?: string; // transfer tx hash
  deliverableHash?: string; // hash value of all work descriptions(summary, detail, deliverables)
  platform?: string; // a transaction platform if exists e.g, gitcoin
  relatedTxHashes?: string[]; //tx releated work
  tags?: string[]; //tags
  genre?: string; // main genre
  jobType: "FullTime" | "PartTime" | "OneTime"; // default=OneTime
  toSig?: string; // sig of payee
  fromSig?: string; // sig of payer
  toSigner?: string; // who signed this cvoxel as payee actually. Only EOA supported
  fromSigner?: string; // who signed this cvoxel as payer actually. Only EOA supported
  startTimestamp?: string; //timestamp to start work
  endTimestamp?: string; //timestamp to end work
  subtasks?: Subtask[];
  createdAt?: string; //timestamp to be created
  updatedAt?: string; //timestamp to be updated
  relatedAddresses: string[]; // all addresses related to this cvoxel. may contain both EOA and contract address
};

export type WorkCredentialForm = WorkCredential & {
  deliverableLink?: string;
  deliverableCID?: string;
  tokenAddress: string;
  isPublished?: boolean;
};

export type DeliverableItem = {
  format: string;
  value: string;
};

export type Subtask = {
  detail: string;
  genre: string;
};

export type WorkCredentialMetaDraft = WorkCredential & {
  potencialPayer?: string[]; // in case of multisig wallet
  potencialPayee?: string[]; // in case of multisig wallet
  completed?: boolean; // whether or not work is completed (only in case of LanC., it might be false)
};

export type WorkCredentialItem = {
  id: string;
  txHash?: string; // transfer tx hash
  isPayer: boolean;
  summary: string;
  deliverables?: DeliverableItem[]; // deliberable link
  fiatValue?: string;
  genre?: string; // main genre
  deliverableHash?: string; // hash value of all work descriptions(summary, detail, deliverables)
  platform?: string; // a transaction platform if exists e.g, gitcoin
  isVerified?: boolean;
  issuedTimestamp: string;
};

export type WorkCredentials = {
  WorkCredentials: WorkCredentialItem[];
};

export type ModelTypes = ModelTypeAliases<
  {
    AlsoKnownAs: AlsoKnownAs;
    BasicProfile: BasicProfile;
    CryptoAccounts: CryptoAccountLinks;
    WorkCredential: WorkCredential;
    WorkCredentials: WorkCredentials;
  },
  {
    alsoKnownAs: "AlsoKnownAs";
    basicProfile: "BasicProfile";
    cryptoAccounts: "CryptoAccounts";
    workCredential: "WorkCredential";
    workCredentials: "WorkCredentials";
  }
>;
