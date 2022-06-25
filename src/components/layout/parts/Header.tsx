import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-daisyui";
import AccountButton from "@/components/common/AccountButton";
import { useRouter } from "next/router";


export const Header = () => {
    const router = useRouter(); 

    const createNewPayment = () => {
        router.push(`/pay`);
      };
    
      const showPayBtn = useMemo(() => {
          return router.pathname !== "/pay"
      },[router.pathname])
  
  return (
    <div className="navbar h-24 py-1 px-2 sm:px-8">
        <div className="flex flex-grow">
            <a className="btn btn-ghost normal-case text-xl">
                <Link href="/" passHref>
                    <div className="text-center flex">
                    <Image
                        src="/logo.png"
                        alt="contx"
                        objectFit="cover"
                        width="170px"
                        height="60px"
                    />
                    </div>
                </Link>
            </a>
        </div>
        <div className="flex-none sm:space-x-3 items-center ">
            {showPayBtn && (
                <div className="flex items-center">
                    <Button onClick={() => createNewPayment()} type="button" className="px-2 py-1.5 text-xs sm:px-4 sm:text-base text-white bg-gradient-to-r from-border_l via-border_via to-border_r">New</Button>
                </div>
            )}
            <div className="flex items-center">
                <AccountButton />
            </div>
        </div>
    </div>
  );
};
