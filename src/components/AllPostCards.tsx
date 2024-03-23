import { formateDate } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
function AllPostsCard({ post }: { post: PostType }) {
  return (
    <div className="w-[550px] h-min-[500px] shadow-md rounded-md">
      <div className="flex justify-between items-center p-3">
        <div>
          <h1 className="text-2xl font-bold">{post.user.name}</h1>
          <p>{formateDate(post.created_at)}</p>
        </div>
      </div>
      <Image
        src={`http://localhost:3000/uploads/${post.image}`}
        alt="Post image"
        width={100}
        height={100}
        className="w-full h-[300px] object-cover"
        unoptimized
      />
      <Link href={`/home/${post.id}`}>
        <div className="p-5">
          <h1 className="text-xl font-bold">{post.title}</h1>
          <p className="text-sm">{post.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default AllPostsCard;
