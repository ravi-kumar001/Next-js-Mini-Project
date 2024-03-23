import React from "react";
import Image from "next/image";

function AuthLogo() {
  return (
    <div className="flex absolute top-2 left-2 lg:top-5 lg:left-10 items-center">
      <Image
        src={"/images/logo.png"}
        alt={"logo icon"}
        width={40}
        height={40}
      />
      <h1 className="text-2xl font-bold">DevUI</h1>
    </div>
  );
}

export default AuthLogo;
