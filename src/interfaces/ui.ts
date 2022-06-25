export const TAB_NAME = {
  Paid: "Paid",
  Received: "Received",
  Failed: "Failed",
} as const;

type TabType = typeof TAB_NAME;
export type TabKey = keyof TabType;
