import React from "react";
import Image from "next/image";
function Loading() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Image
        alt="loading image"
        width={400}
        height={400}
        src={"/images/loading.svg"}
      />
      <h1 className="text-2xl font-bold">Loading please wait...</h1>
    </div>
  );
}

export default Loading;
