"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);

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
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("tags", tags);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Error during upload:", error);
    }

    setTitle("");
    setDesc("");
    setImage(null);
    setTags([]);
  };

  return (
    <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto">
      <div class="text-center">
        <h2 class="mt-5 text-3xl font-bold text-gray-900">File Upload!</h2>
        <p class="mt-2 text-sm text-gray-400">
          Lorem ipsum is placeholder text.
        </p>
      </div>
      <div class="mt-8 space-y-3">
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">
            Title
          </label>
          <input
            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">
            Your Description
          </label>
          <textarea
            rows="4"
            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Write your thoughts here..."
            name="title"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">
            Add Tags
          </label>
          <input
            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Enter tags"
            name="tags"
            onKeyDown={handleAddTag}
          />
        </div>
        <div class="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              class="bg-blue-100 inline-flex items-center text-sm rounded mr-1 mt-1"
            >
              <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
                {tag}
              </span>
              <button
                onClick={() => {
                  const updatedTags = [...tags];
                  updatedTags.splice(index, 1);
                  setTags(updatedTags);
                }}
                class="w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none"
              >
                <svg
                  class="w-6 h-6 fill-current mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">
            Attach Document
          </label>
          {!image ? (
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                  <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img
                      class="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                    />
                  </div>
                  <p class="pointer-none text-gray-500 ">
                    <span class="text-sm">Drag and drop</span> files here <br />{" "}
                    or select a file from your computer
                  </p>
                </div>
                <input {...getInputProps()} accept="image/*" class="hidden" />
              </label>
            </div>
          ) : (
            <>
              <div class="flex flex-auto mx-auto mt-10">
                <img class="max-w-full h-auto rounded-lg" src={image} />
              </div>
              <input
                onClick={handleCancel}
                type="button"
                value="Cancel"
                class="my-5 w-1/3 flex justify-center bg-blue-500 text-gray-100 py-3 rounded-full
                        hover:bg-red-400 shadow-lg cursor-pointer"
              />
            </>
          )}
        </div>
        <p class="text-sm text-gray-600">
          <span>File type: types of images</span>
        </p>
        <div>
          <button
            onClick={handleFormSubmit}
            class="my-5 w-full flex justify-center border-2 border-black bg-white text-black p-3 rounded-full tracking-wide
                 font-semibold focus:outline-none focus:shadow-outline hover:bg-black hover:text-white shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
