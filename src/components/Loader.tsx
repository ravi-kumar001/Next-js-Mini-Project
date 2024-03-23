import React, { Fragment } from "react";
import Image from "next/image";

function Loader() {
  return (
    <Fragment>
      <Image
        alt="loading image"
        width={200}
        height={200}
        src={"/images/loading.svg"}
      />
      <h1 className="text-2xl font-bold">Loading...</h1></Fragment>
  );
}

export default Loader;
