import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: FC = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
    <div>
        <Link href="/" passHref>
            <div className="text-center flex">
            <Image
                src="/logo.png"
                alt="logo"
                objectFit="cover"
                width="154px"
                height="44px"
            />
            </div>
        </Link>
    <p>Copyright © {new Date().getFullYear()}</p>
  </div> 
</footer>
  );
};
