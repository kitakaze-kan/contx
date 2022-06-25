import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Footer } from "./parts/Footer";
import { Header } from "./parts/Header";
// import { Toaster } from "react-hot-toast";
import { ConnectWalletModal } from "../common/ConnectWalletModal";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export const BaseLayout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <div className="min-w-full w-full bg-[#050505]">
      <div className={"text-sm "}>
        <Header />
            <div className="mx-auto px-4 w-full min-h-screen overflow-y-scroll break-words">
              {children}
            </div>
        <Footer />
      </div>
      {/* <Toaster /> */}
      <ConnectWalletModal />
    </div>
  );
};
