"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [msg, setMsg] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setImage(null);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      setTags((prevTags) => [...prevTags, newTag]);
      e.target.value = "";
    }
  };

  const { getInputProps } = useDropzone({ onDrop });

  const handleFormSubmit = async (e) => {
    if (!title || !desc || !image || !tags.length) {
      setMsg("Please fill all fields");
      return;
    }
    setButtonDisabled(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("tags", tags);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setMsg(responseData.msg);
      setButtonDisabled(false);
    } catch (error) {
      console.error("Error during upload:", error);
    }

    setTitle("");
    setDesc("");
    setImage(null);
    setTags([]);
  };

  return (
    <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto">
      <div className="text-center">
        <h2 className="mt-5 text-3xl font-bold text-gray-900">File Upload!</h2>
        <p className="mt-2 text-sm text-gray-400">
          Lorem ipsum is placeholder text.
        </p>
      </div>
      <div className="mt-8 space-y-3">
        <div className="grid grid-cols-1 space-y-2">
          <label
            className="text-sm font-bold text-gray-500 tracking-wide"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label
            className="text-sm font-bold text-gray-500 tracking-wide"
            htmlFor="desc"
          >
            Your Description
          </label>
          <textarea
            rows="4"
            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Write your thoughts here..."
            name="desc"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label
            className="text-sm font-bold text-gray-500 tracking-wide"
            htmlFor="tags"
          >
            Add Tags
          </label>
          <input
            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Enter tags"
            name="tags"
            id="tags"
            onKeyDown={handleAddTag}
          />
        </div>
        <div className="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-100 inline-flex items-center text-sm rounded mr-1 mt-1"
            >
              <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
                {tag}
              </span>
              <button
                onClick={() => {
                  const updatedTags = [...tags];
                  updatedTags.splice(index, 1);
                  setTags(updatedTags);
                }}
                className="w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none"
              >
                <svg
                  className="w-6 h-6 fill-current mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label
            className="text-sm font-bold text-gray-500 tracking-wide"
            id="image"
          >
            Attach Document
          </label>

          {!image ? (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <Image
                      className="has-mask h-36 object-center"
                      src="/image-upload.jpg"
                      alt="ImageNet"
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <p className="pointer-none text-gray-500 ">
                    <span className="text-sm">Drag and drop</span> files here{" "}
                    <br /> or select a file from your computer
                  </p>
                </div>
                <input
                  {...getInputProps()}
                  accept="image/*"
                  className="hidden"
                  id="image"
                />
              </label>
            </div>
          ) : (
            <>
              <div className="flex flex-auto mx-auto mt-10">
                <Image
                  className="max-w-full h-auto rounded-lg"
                  src={image}
                  width={1000}
                  height={1000}
                  alt="ImageNet"
                />
              </div>
              <input
                onClick={handleCancel}
                type="button"
                value="Cancel"
                className="disabled my-5 w-1/3 flex justify-center bg-blue-500 text-gray-100 py-3 rounded-full
                        hover:bg-red-400 shadow-lg cursor-pointer"
              />
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          <span>File type: types of images</span>
        </p>
        <div>
          <button
            disabled={isButtonDisabled}
            onClick={handleFormSubmit}
            className="my-5 w-full flex justify-center border-2 border-black bg-white text-black p-3 rounded-full tracking-wide
                 font-semibold focus:outline-none focus:shadow-outline hover:bg-black hover:text-white shadow-lg cursor-pointer transition ease-in duration-300 disabled:bg-red-800 disabled:text-white disabled:cursor-no-drop"
          >
            Upload
          </button>
        </div>
      </div>
      {msg != "" ? (
        <div
          id="toast-success"
          className="flex mx-auto items-center w-full max-w-xs p-4 mb-4 text-white rounded-lg shadow bg-green-400"
          role="alert"
        >
          <div className="ms-3 text-sm font-normal">{msg}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={(e) => setMsg("")}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ImageUpload;
