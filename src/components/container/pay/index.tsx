import { PayCard } from "@/components/pay/PayCard";
import { usePayment } from "@/hooks/usePayment";
import { WorkCredentialForm } from "@/interfaces";
import { FC } from "react";

export const PayContainer:FC = () => {
    const {execPayment} = usePayment()

    const execPay = (data:WorkCredentialForm) => {
        execPayment(data)

    }

    return (
        <main className="text-white text-center h-screen overflow-hidden flex justify-center ">
            <PayCard onSubmit={execPay}/>
        </main>
    )
}