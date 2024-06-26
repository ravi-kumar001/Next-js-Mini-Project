"use client";

import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import ExploreCard from "@/components/ExploreCard";

export default function Explore() {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNotFound(false);
    setPosts([]);
    if (search.length > 0) {
      setLoading(true);
      axios
        .get(`/api/home/search?query=${search}`)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          if (response.status == 200) {
            if (response.data?.length > 0) {
              setPosts(response.data);
            } else {
              setNotFound(true);
              setPosts([]);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setPosts([]);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-2xl font-bold text-center text-green-500">Search with Title</h1>
        <div className="flex justify-center items-center mt-10 flex-col">
          <form onSubmit={handleSubmit}>
            <Input
              className="w-full lg:w-[700px] h-22 rounded-lg text-2xl"
              placeholder="Start typing..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {loading && <Loader />}
          {notFound && <NotFound />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:place-content-center sm:items-center mt-10">
            {posts.map((item) => (
              <ExploreCard post={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
