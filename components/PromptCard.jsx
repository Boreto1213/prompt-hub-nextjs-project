"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { MdContentCopy, MdDone } from "react-icons/md";
import { TbArrowBigDownLineFilled, TbArrowBigUpLineFilled } from "react-icons/tb";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [interactions, setInteractions] = useState({ liked: false, disliked: false });
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const goToProfile = (id) => router.push(`/profile/${id}`);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleLike = () => {
    setInteractions(prev => {
      const liked = !prev.liked;
      const disliked = liked ? false : prev.disliked;
      console.log(liked, disliked);
      return { liked, disliked };
    })
  }

  const handleDislike = () => {
    setInteractions(prev => {
      const disliked = !prev.disliked;
      const liked = disliked ? false : prev.liked;
      console.log(liked, disliked);

      return { liked, disliked };
    })
  }

  return (
    <div className="flex-1 rounded-lg border border-gray-300 bg-clip-padding p-6 pb-4 bg-white/90 break-inside-avoid backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={() => goToProfile(post.creator._id)}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div
          onClick={handleCopy}
          className="w-7 h-7 rounded-full bg/white/10 shadow-[inset_10px_-50px_940x_0px_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
        >
          {copied === post.prompt ? (
            <MdDone width={12} height={12} color="gray" />
          ) : (
            <MdContentCopy width={12} height={12} color="gray" />
          )}
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div>
        <p
          onClick={() => {
            handleTagClick(post.tag);
          }}
          className="font-inter text-sm orange-gradient cursor-pointer w-fit"
        >
          {post.tag}
        </p>
      </div>

      {pathname !== "/profile" && (
        <div className="flex justify-end gap-3">
          <TbArrowBigUpLineFilled
           fontSize={20}
            color={interactions.liked ? "green" : "gray"}
            onClick={handleLike}
            style={{ cursor: "pointer" }}
          />
          <TbArrowBigDownLineFilled
            fontSize={20}
            color={interactions.disliked ? "#D22B2B" : "gray"}
            onClick={handleDislike}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex justify-end gap-3">
          <p
            onClick={handleEdit}
            className="font-inter text-sm cursor-pointer blue-gradient"
          >
            Edit
          </p>
          <p
            onClick={handleDelete}
            className="font-inter text-sm cursor-pointer red-gradient"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
