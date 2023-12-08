"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

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

  const { getInputProps } = useDropzone({ onDrop });

  return (
    <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto">
      <div class="text-center">
        <h2 class="mt-5 text-3xl font-bold text-gray-900">File Upload!</h2>
        <p class="mt-2 text-sm text-gray-400">
          Lorem ipsum is placeholder text.
        </p>
      </div>
      <form class="mt-8 space-y-3" action="#" method="POST">
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">
            Title
          </label>
          <input
            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            type=""
            placeholder="Title"
          />
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
            type="submit"
            class="my-5 w-full flex justify-center border-2 border-black bg-white text-black p-3 rounded-full tracking-wide
                 font-semibold focus:outline-none focus:shadow-outline hover:bg-black hover:text-white shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
