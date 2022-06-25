import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useShowConnectWalletModal } from "@/jotai/ui";
import Image from "next/image";
import { FC } from "react";
import { Modal,Button } from "react-daisyui";

export const ConnectWalletModal: FC = () => {

    const [isShow, setShow] = useShowConnectWalletModal()
    const { connectWalletOnly } = useMyCeramicAcount();

    const metaMask = <Image src={"/metamask.svg"} width={48} height={48} objectFit="contain" alt="metamask" />
    const walletConnect = <Image src={"/wallet_connect.svg"} width={48} height={48} objectFit="contain" alt="metamask" />

    const connect = (type: "metamask" | "walletconnect") => {
        connectWalletOnly(type)
        setShow(false)
    }

    return (
        <>
            <Modal open={isShow}>
                <Modal.Header>Connect Wallet</Modal.Header>

                <Modal.Body className="text-center w-full space-y-2">
                    <Button className="w-full" onClick={() => connect("metamask")} startIcon={metaMask} >Metamask</Button>
                    <Button className="w-full" onClick={() => connect("walletconnect")} startIcon={walletConnect} >Wallet Connect</Button>
                </Modal.Body>

                <Modal.Actions>
                    <Button onClick={() => setShow(false)} color="primary">
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}