import { formatDID } from "@self.id/framework";
import { AvatarPlaceholder } from "@self.id/ui";
import { DisplayAvatar } from "./DisplayAvatar";
import Router from "next/router";
import { IconAvatar } from "./IconAvatar";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useSetConnectWalletModal } from "@/jotai/ui";
import { Button } from "react-daisyui";

type MenuButtonProps = {
  label: string;
  onClick: () => void;
};

function MenuButton({ label, ...props }: MenuButtonProps) {
  return (
    <div>
      <button className="text-sm" {...props}>
        <p className="text-sm">{label}</p>
      </button>
    </div>
  );
}

export default function AccountButton() {
  const {
    connection,
    disconnectCeramic,
    account,
    did,
    name,
    avator,
  } = useMyCeramicAcount();
  const setShow = useSetConnectWalletModal()

  const goToMypage = () => {
    Router.push(`/dashboard`);
  };
  const goToWCs = (did:string) => {
    Router.push(`/${did}`);
  };

  if (account) {
    const buttons =
    <>
      <MenuButton label="Work Credentials" onClick={() => goToWCs(did)} />
      <MenuButton label="Dashboard" onClick={() => goToMypage()} />
      <MenuButton label="Disconnect" onClick={() => disconnectCeramic()} />
    </>

    const content = (
      <div className="bg-card text-oncard p-4">
        <div className="space-y-4 text-center p-2">
          <div className="flex items-center justify-center">
            {avator ? (
              <IconAvatar src={avator} size={"lg"} />
            ) : (
              <AvatarPlaceholder did={did} size={60} />
            )}
          </div>
          <p className="font-bold text-sm">
            {name ? name : did ? formatDID(did, 12) : formatDID(account, 12)}
          </p>
        </div>
        <div className="rounded-lg space-y-2">{buttons}</div>
      </div>
    );

    return (
      <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
              <DisplayAvatar
                  did={did}
                  label={
                    name ? name : did ? formatDID(did, 12) : formatDID(account, 12)
                  }
                  loading={connection.status === "connecting"}
                  src={avator}
                  hiddenLabelOnSp={true}
                />
          </label>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              {content}
          </div>
      </div>
    );
  }

  return connection.status === "connecting" ? (
    <DisplayAvatar label="Connecting..." loading hiddenLabelOnSp={true} />
  ) : (
    <Button
      className="rounded-lg px-2 py-1.5 text-xs sm:px-4 sm:text-base text-white bg-gradient-to-r from-border_l via-border_via to-border_r"
      onClick={() => setShow(true)}
    >
      {" "}
      Connect Wallet
    </Button>
  );
}
