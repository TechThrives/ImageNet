"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "/components/navbar";

export default function ImageDetails({ params }) {
  const [imageInfo, setImageInfo] = useState({ title: "", tags: [], desc: "" });

  const imageid = params.imageid;
  const imageUrl = `/api/image/${imageid}`;

  useEffect(() => {
    getImageInfo(imageid);
  }, []);

  async function getImageInfo(imageId) {
    try {
      const apiUrl = `/api/info/${imageId}`;
      const response = await fetch(apiUrl, { cache: "no-store" });
      const jsonData = await response.json();
      setImageInfo(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <Navbar />
      <section class="py-8 sm:py-8">
        <div class="container mx-auto px-4">
          <nav class="flex">
            <ol role="list" class="flex items-center">
              <li class="text-left">
                <div class="flex items-center">
                  <div class="-m-1">
                    <Link
                      href="/images"
                      class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 hover:text-gray-800"
                    >
                      Images
                    </Link>
                  </div>
                </div>
              </li>

              <li class="text-left">
                <div class="flex items-center">
                  <span class="mx-2 text-gray-400">/</span>
                  <div class="-m-1">
                    <p
                      class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 hover:text-gray-800"
                      aria-current="page"
                    >
                      {imageid}
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div class="lg:col-span-3 lg:row-end-1">
              <div class="lg:flex lg:items-start">
                <div class="lg:order-2 lg:ml-5">
                  <div class="max-w-xl overflow-hidden rounded-lg mx-auto">
                    <img
                      class="h-full w-full max-w-full object-cover"
                      src={imageUrl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {imageInfo.title}
              </h1>

              <h2 class="mt-8 text-base text-gray-900">Tags</h2>
              <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                {imageInfo.tags.map((tag, index) => (
                  <label class="">
                    <p class="hover:bg-black hover:text-white rounded-lg border border-black px-6 py-2 font-bold">
                      {tag}
                    </p>
                  </label>
                ))}
              </div>

              <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div class="flex items-end">
                  <h1 class="text-3xl font-bold">Free</h1>
                </div>

                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download
                </button>
              </div>

              <ul class="mt-8 space-y-2">
                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    class="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      class=""
                    ></path>
                  </svg>
                  Copyright Free
                </li>
              </ul>
            </div>

            <div class="lg:col-span-3">
              <div class="border-b border-gray-300">
                <nav class="flex gap-4">
                  <p
                    title=""
                    class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  >
                    Description
                  </p>
                </nav>
              </div>

              <div class="mt-8 flow-root sm:mt-12">
                <h1 class="text-3xl font-bold">Delivered To Your Door</h1>
                <p class="mt-4">{imageInfo.description}</p>
                <h1 class="mt-8 text-3xl font-bold">
                  From the Fine Farms of Brazil
                </h1>
                <p class="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  numquam enim facere.
                </p>
                <p class="mt-4">
                  Amet consectetur adipisicing elit. Optio numquam enim facere.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolore rerum nostrum eius facere, ad neque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
