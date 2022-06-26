import { FC } from "react";
import { Table } from "react-daisyui";
import { CommonSpinner } from "../common/CommonSpinner";
import { FailedListItem } from "./FailedListItem";

export const FailedList: FC = () => {

    if(isLoadingFailedList) {
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
                    <span>Timestamp</span>
                    <span>To</span>
                    <span>Amount</span>
                    <span>Summary</span>
                    <span>Deliverables</span>
                    <span>Tx Hash</span>
                    <span>key Hash</span>
                </Table.Head>

                <Table.Body>
                    {failedList && failedList.map((item, index) => {
                        return (
                            <FailedListItem key={index} item={item} />
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}