"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Image
        alt="loading image"
        width={400}
        height={400}
        src={"/images/error.svg"}
      />
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <h1 className="text-2xl font-bold">Something went wrong. Please try again</h1>
      </button>
    </div>
  );
}
