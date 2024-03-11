"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { UploadButton } from "~/utils/uploadthing";

import { trpc } from "../_trpc/client";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";

const BlogForm = ({ userId, username }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState(image);
  const [createdBy, setCreatedBy] = useState(username);
  const [status, setStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
    }

    try {
      const res = await createPost.mutate({
        input: {
          title: title,
          description: description,
          createdBy: createdBy,
          userId: userId,
          image: image,
          thumbnail: thumbnail,
        },
      });
      if (createPost.status === "success") {
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPost: any = trpc.blog.postBlog.useMutation();

  return (
    <form className="m-10 flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        required
        placeholder="Blog Title"
        className="rounded-md border border-slate-500 px-8 py-2"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
        rows={10}
        placeholder="Description"
        className="rounded-md border border-slate-500 px-8 py-2"
      />
      {imageStatus && (
        <Image src={image} width={200} height={200} alt={title} />
      )}
      <div className="flex-start flex items-center">
        <UploadButton
          endpoint="imageUploader"
          onUploadProgress={() => {
            setStatus(true);
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            const fileUrl = res[0] ? res[0].url : "";
            setImage(fileUrl);
            setThumbnail(fileUrl);
            alert("Upload Image complete, you may now submit the post");
            setStatus(false);
            setImageStatus(true);
            return res;
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      {status ? (
        <FaSpinner />
      ) : (
        <button
          type="submit"
          className="w-fit rounded-xl bg-green-300 px-6 py-3 font-bold"
        >
          Add
        </button>
      )}
    </form>
  );
};

export default BlogForm;
