"use client";

import Profile from "@/components/Profile";
import { useEffect, useState } from "react";

const UserProfilePage = ({ params }) => {
  const userId = params.id;
  console.log(userId);


  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      setUser({ username: data.username, email: data.email });
    };

    const getUserPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    if (userId) {
      getUserData();
      getUserPosts();
    }
  }, [userId]);

  return (
    <Profile
      name={user.username}
      desc={user.email}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default UserProfilePage;
