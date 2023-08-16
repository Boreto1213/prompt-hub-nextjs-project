"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterPosts = (posts) =>
    posts.filter(
      (post) =>
        post.tag.includes(searchQuery) ||
        post.creator.username.includes(searchQuery)
    );

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full flex justify-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          value={searchQuery}
          required
          className="block w-full text-white/90 rounded-md border-black border bg-neutral-700 py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-gray-200 focus:outline-none focus:ring-0 peer"
        />
      </form>

      <PromptCardList
        data={searchQuery === "" ? posts : filterPosts(posts)}
        handleTagClick={setSearchQuery}
      />
    </section>
  );
};

export default Feed;
