import React, { Fragment } from "react";
import Image from "next/image";
function NotFound() {
  return (
    <Fragment>
      <Image
      className="mt-5"
        alt="loading image"
        width={200}
        height={200}
        src={"/images/error.svg"}
      />
      <h1 className="text-2xl font-bold">Not Found</h1>
    </Fragment>
  );
}

export default NotFound;
