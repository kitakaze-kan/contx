import { TabKey, TAB_NAME } from "@/interfaces/ui";
import { atom, useAtom, useSetAtom } from "jotai";

export const PaymentStatusType = {
  Idling: 0,
  failed: 1,
  SavingDeliverables: 2,
  executingTransaction: 3,
  issuingWorkCredential: 4,
  issuedWorkCredential: 5,
  finishedWithoutWorkCredential: 6,
} as const;

type paymentStatusType =
  typeof PaymentStatusType[keyof typeof PaymentStatusType];

export const paymentStatus = atom<paymentStatusType>(PaymentStatusType.Idling);

export const usePaymentStatus = () => useAtom(paymentStatus);
export const useSetPaymentStatus = () => useSetAtom(paymentStatus);

export const showPaymentModal = atom<boolean>(false);

export const useShowPaymentModal = () => useAtom(showPaymentModal);
export const useSetPaymentModal = () => useSetAtom(showPaymentModal);

export const showConnectWalletModal = atom<boolean>(false);

export const useShowConnectWalletModal = () => useAtom(showConnectWalletModal);
export const useSetConnectWalletModal = () =>
  useSetAtom(showConnectWalletModal);

export const manageTab = atom<TabKey>(TAB_NAME.Paid);

export const useManageTab = () => useAtom(manageTab);
