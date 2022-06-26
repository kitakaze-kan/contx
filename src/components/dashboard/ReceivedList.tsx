import { useGraph } from "@/hooks/useGraph";
import { FC } from "react";
import { Table } from "react-daisyui";
import { CommonSpinner } from "../common/CommonSpinner";
import { PaidListItem } from "./PaidListItem";

export const ReceivedList: FC = () => {

    const {payeeList } = useGraph()

    if(payeeList.fetching) {
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
                    <span>From</span>
                    <span>Tx Hash</span>
                    <span>Deliverable Hash</span>
                </Table.Head>

                <Table.Body>
                {payeeList.data && payeeList.data.payments.map((item) => {
                        return (
                            <PaidListItem key={item.id} item={item} />
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}