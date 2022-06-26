import { useENS } from "@/hooks/useENS";
import { Payment } from "@/interfaces";
import { shortenStr } from "@/utils/tools";
import { FC } from "react";
import { Table } from "react-daisyui";
import { CommonSpinner } from "../common/CommonSpinner";

type PaidListItemProps = {
    item: Payment
}
export const PaidListItem: FC<PaidListItemProps> = ({item}) => {

    const { ens, ensLoading } = useENS(item.payee);


    return (
        <Table.Row key="1">
            <span></span>
            <span>
                {ensLoading ? (
                    <CommonSpinner size="sm" />
                ) : (
                    <span>{ens}</span>
                )}    
            </span>
            <span>{shortenStr(item.txHash)}</span>
            <span>{shortenStr(item.id)}</span>
        </Table.Row>
    )
}