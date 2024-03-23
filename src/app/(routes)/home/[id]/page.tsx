import SinglePost from "@/components/SinglePost";
import React from "react";

async function getPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/home/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log(response);
  return response?.data;
}
const Home = async ({ params }: { params: { id: string } }) => {
  const singlePost = await getPost(params.id);
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <SinglePost post={singlePost} />
    </div>
  );
};

export default Home;
