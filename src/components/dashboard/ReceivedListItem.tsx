import { useENS } from "@/hooks/useENS";
import { WorkCredentialForm } from "@/interfaces";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortenStr } from "@/utils/tools";
import { FC } from "react";
import { Table } from "react-daisyui";
import { CommonSpinner } from "../common/CommonSpinner";

type ReceivedListItemProps = {
    item: WorkCredentialForm
}
export const ReceivedListItem: FC<ReceivedListItemProps> = ({item}) => {

    const { ens, ensLoading } = useENS(item.from);


    return (
        <Table.Row key="1">
            <span></span>
            <span>{convertTimestampToDateStr(item.issuedTimestamp)}</span>
            <span>
                {ensLoading ? (
                    <CommonSpinner size="sm" />
                ) : (
                    <span>{ens}</span>
                )}    
            </span>
            <span>
                {formatBigNumber(item.value, 6, item.tokenDecimal.toString())}{" "}{item.tokenSymbol}
            </span>
            <span className="flex items-center flex-wrap">
            </span>
            <span>{item.summary}</span>
            <span>
            {item?.deliverables && item.deliverables.map(d => {
                      return (
                        <span key={d.value}>
                          <a
                            className="flex items-center flex-wrap"
                            href={`${d.format==="url" ? d.value : `https://dweb.link/ipfs/${d.value}`}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p className="text-xs text-secondary">
                              {shortenStr(d.value)}
                            </p>
                          </a>
                        </span>
                      )
                    })}
            </span>
            <span>{shortenStr(item.txHash)}</span>
        </Table.Row>
    )
}