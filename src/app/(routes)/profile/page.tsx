import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { AddPost } from "@/components/AddPost";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import SignOutBtn from "@/components/SignOutBtn";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import React, { Fragment } from "react";

async function getPost() {
  const res = await fetch("http://localhost:3000/api/user/post", {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  return response?.data;
}
async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts = await getPost();

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="font-bold text-lg">Hello , {session?.user?.name}</h1>
          <div className="flex justify-center items-center mt-2">
            <div className="mx-2">
              <AddPost user_id={session?.user?.id!} />
            </div>
            <div>
              <SignOutBtn />
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {posts != undefined && posts != null ? (
                posts.map((items: PostType) => (
                  <PostCard post={items} key={items.id} />
                ))
              ) : (
                <div>No Record Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
