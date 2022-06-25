import { DeliverableItem } from "@/interfaces";
import { utils } from "ethers";
import { convertDateToTimestampStr } from "./tools";

export const genDeliverableHash = (
  timestamp: string,
  summary: string,
  detail?: string,
  deliverables?: DeliverableItem[]
) => {
  const deliverable = {
    summary,
    detail: detail || "",
    deliverables: deliverables || [],
    timestamp,
  };
  // return utils.keccak256(utils.toUtf8Bytes(JSON.stringify(deliverable)));
  return utils.hashMessage(JSON.stringify(deliverable));
};
