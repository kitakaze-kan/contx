import { useGraph } from "@/hooks/useGraph";
import { FC } from "react";
import { Table } from "react-daisyui";
import { CommonSpinner } from "../common/CommonSpinner";
import { PaidListItem } from "./PaidListItem";

export const PaidList: FC = () => {

    const {payerList } = useGraph()

    if(payerList.fetching) {
        return (
            <div className="flex w-full items-center justify-center space-x-2">
                <CommonSpinner />
            </div>
        )
    }

    return (
        <div className='overflow-x-auto w-full'>
            <Table className="w-full">
                <Table.Head>
                    <span></span>
                    <span>To</span>
                    <span>Tx Hash</span>
                    <span>Deliverable Hash</span>
                </Table.Head>

                <Table.Body>
                    {payerList.data && payerList.data.payments.map((item) => {
                        return (
                            <PaidListItem key={item.id} item={item} />
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}