"use client";
import React, { useState } from "react";
import Navbar from "/components/navbar";
import ImageUpload from "/components/imageupload";

export default function Upload() {
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const correctPassword = "Upload@ImageNet";
    const isCorrect = password === correctPassword;

    setIsPasswordCorrect(isCorrect);
  };
  return (
    <div className="h-screen flex-col">
      <div className="bg-white w-full top-0 z-50">
        <Navbar />
      </div>
      <div>
        {!isPasswordCorrect ? (
          <form onSubmit={handlePasswordSubmit}>
            <div class="flex flex-col items-center justify-center px-20 mt-8">
              <h1 class="text-lg font-bold font-serif">Enter Password</h1>

              <div class="relative mt-4">
                <input
                  type="password"
                  id="password"
                  class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pr-3 pb-3 pt-3 text-sm text-gray-900 focus:border-2 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  for="password"
                  class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Password
                </label>
              </div>
              <hr class="my-4 opacity-75" />
              <div class="flex justify-end space-x-2">
                <button
                  type="submit"
                  class="px-4 border-2 border-black bg-white text-black p-2 rounded-xl font-semibold focus:outline-none focus:shadow-outline hover:bg-black hover:text-white shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : (
          <ImageUpload />
        )}
      </div>
    </div>
  );
}
