import { PaymentStatusType, usePaymentStatus, useShowPaymentModal } from "@/jotai/ui";
import { FC, useMemo } from "react";
import { Modal,Button, Steps } from "react-daisyui";

export const PaymentStepModal: FC = () => {

    const [isShow, setShow] = useShowPaymentModal()
    const [paymentStatus, _] = usePaymentStatus()

    const toggleVisible = () => {
        setShow(!isShow)
    }

    const statusDescription = useMemo(() => {
        switch (paymentStatus) {
            case PaymentStatusType.Idling:
                return "Now preparing..."
            case PaymentStatusType.SavingDeliverables:
                return "Saving deliverables..."
            case PaymentStatusType.executingTransaction:
                return "Executing payment transaciton..."
            case PaymentStatusType.issuingWorkCredential:
                return "Issuing work credential..."
            case PaymentStatusType.issuedWorkCredential:
                return "The new work credential got issued!"
            case PaymentStatusType.failed:
                return "something went wrong...:("
            default:
                break;
        }
    },[paymentStatus])

    return (
        <>
            <Modal open={isShow}>
                <Modal.Header>{paymentStatus === PaymentStatusType.issuedWorkCredential ? "Congrats!" :  "Payment In Progress"}</Modal.Header>

                <Modal.Body>
                    {statusDescription}
                    <Steps>
                        <Steps.Step color={paymentStatus>1 ? "success": paymentStatus===1 ? "info": undefined}>Saving Deliverables</Steps.Step>
                        <Steps.Step color={paymentStatus>2 ? "success": undefined}>Executing Transaction</Steps.Step>
                        <Steps.Step color={paymentStatus>3 ? "success": undefined}>Issuing Work Credential</Steps.Step>
                        <Steps.Step color={paymentStatus>4 ? "success": undefined}>Success!</Steps.Step>
                    </Steps>
                </Modal.Body>

                <Modal.Actions>
                    {(paymentStatus===PaymentStatusType.issuedWorkCredential || paymentStatus===PaymentStatusType.failed || paymentStatus===PaymentStatusType.Idling) ? (
                        <Button onClick={toggleVisible} color="primary">
                            Close
                        </Button>
                    ): (
                        <Button color="ghost" loading>
                            paying...
                        </Button>
                    )}
                </Modal.Actions>
            </Modal>
        </>
    )
}