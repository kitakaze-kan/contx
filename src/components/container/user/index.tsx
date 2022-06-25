import { DisplayAvatar } from "@/components/common/DisplayAvatar";
import { WorkCredentialCard } from "@/components/user/WorkCredentialCard";
import { useCeramicAcount } from "@/hooks/useCeramicAcount";
import { useWCRecords } from "@/hooks/useWorkCredentials";
import { formatDID } from "@self.id/framework";
import { FC } from "react";
import { Card } from "react-daisyui";

type UserContainerProps = {
    did: string
}
export const UserContainer:FC<UserContainerProps> = ({did}) => {

    const {name, avator} = useCeramicAcount(did)
    const workCredentials = useWCRecords(did)

    return (
        <main className="text-white text-center h-screen">
            <Card bordered normal={"lg"} className="w-full bg-card">
                <Card.Body className={"text-left"}>
                <DisplayAvatar
                  did={did}
                  label={
                    name || formatDID(did, 12)
                  }
                  src={avator}
                  hiddenLabelOnSp={true}
                />
                </Card.Body>
            </Card>

            <div className="grid grid-cols-4 flex-wrap p-4 items-center overflow-auto w-full mx-auto">
                {workCredentials && workCredentials.content?.WorkCredentials.map((wc) => {
                    return (
                        <WorkCredentialCard key={wc.id} wc={wc} />
                    )
                })}
            </div>
        </main>
    )
}