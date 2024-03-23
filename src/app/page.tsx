import React from "react";
import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import AllPostsCard from "@/components/AllPostCards";

async function allPost() {
  const res = await fetch("http://localhost:3000/api/home", {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  return response?.data;
}
export default async function Home() {
  const posts = await allPost();
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {posts != undefined && posts != null ? (
            posts.map((items: PostType) => (
              <AllPostsCard post={items} key={items.id} />
            ))
          ) : (
            <div>No Record Found</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
