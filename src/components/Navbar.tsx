"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import AuthLogo from "./AuthLogo";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Navbar() {
  const pathName: string = usePathname();
  const {data: session, status} = useSession();
  return (
    <div className="h-16 w-full flex justify-between items-center px-6">
      <div className="flex items-center justify-center">
        <AuthLogo />
      </div>
      <div>
        <Link href={"/"}>
          <Button
            variant={"link"}
            className={`${pathName == "/" && "text-blue-500 font-bold"}`}
          >
            Home
          </Button>
        </Link>
        <Link href={"/explore"}>
          <Button
            variant={"link"}
            className={`${pathName == "/explore" && "text-blue-500 font-bold"}`}
          >
            Explore
          </Button>
        </Link>
        {status == 'authenticated'?<Link href={"/profile"}>
          <Button
            variant={"link"}
            className={`${pathName == "/profile" && "text-blue-500 font-bold"}`}
          >
            Profile
          </Button>
        </Link> : <Link href={"/login"}>
          <Button
            variant={"link"}
            className={`text-blue-500 font-bold`}
          >
           Login
          </Button>
        </Link>}
      </div>
    </div>
  );
}

export default Navbar;
