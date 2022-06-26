import { useWCRecord } from "@/hooks/useWorkCredentials";
import { WorkCredentialItem } from "@/interfaces";
import { getExploreLink, shortenStr, shortHash } from "@/utils/tools";
import Image from "next/image";
import { FC, useMemo } from "react";
import { Card } from "react-daisyui";

type WorkCredentialCardProps = {
    wc: WorkCredentialItem
}
export const WorkCredentialCard: FC<WorkCredentialCardProps> = ({wc}) => {

    const workCredential = useWCRecord(wc.id)

    const detail = useMemo(() => {
        return workCredential.content || null
    },[workCredential.content])

    const exploreLink = useMemo(() => {
        if(!wc.txHash) return ""
        return getExploreLink(wc.txHash, detail?.networkId)
      }, [wc.txHash, detail?.networkId])

    if(!detail) {
        return (
            <Card bordered className=" bg-card w-auto h-60 m-2">
                <Card.Body>
                    <Card.Title tag="h2">{wc.summary}</Card.Title>
                    <p>{wc.id}</p>
                    {wc?.deliverables && wc.deliverables.map(d => {
                      return (
                        <div key={d.value}>
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
                        </div>
                      )
                    })}
                    {wc.txHash ? (
                    <div className="flex items-center">
                        <a
                            className=""
                            href={exploreLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {shortHash(wc.txHash)}
                        </a>
                        <Image src={"/link.svg"} width={48} height={48} objectFit="contain" alt="link" />
                    </div>
                    ):(
                        <p>No Tx hash</p>
                    )}
                </Card.Body>
            </Card>
        )
    }


    return (
        <Card bordered className=" bg-card w-auto h-60 m-2">
            <Card.Body className="text-left">
                <Card.Title tag="h2">{detail.summary}</Card.Title>
                <p>{shortenStr(wc.id)}</p>
                <p>{shortenStr(detail.detail, 200)}</p>
                {wc?.deliverables && wc.deliverables.map(d => {
                      return (
                        <div key={d.value}>
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
                        </div>
                      )
                    })}
                {wc.txHash ? (
                    <div className="flex items-center">
                        <a
                            className="pr-1"
                            href={exploreLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {shortHash(wc.txHash)}
                        </a>
                    <Image src={"/link.svg"} width={16} height={16} objectFit="contain" alt="link" />
                </div>
                    ):(
                        <p>No Tx hash</p>
                    )}
            </Card.Body>
        </Card>
    )
}