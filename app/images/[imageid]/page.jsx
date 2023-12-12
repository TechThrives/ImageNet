"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "/components/navbar";
import Modal from "/components/modal";
import Image from "next/image";

export default function ImageDetails({ params }) {
  const [imageInfo, setImageInfo] = useState({
    title: "",
    tags: [],
    desc: "",
    createdAt: "2022-12-11T07:12:01.692Z",
  });
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const imageid = params.imageid;
  const imageUrl = `/api/image/${imageid}`;

  useEffect(() => {
    getImageInfo();
  }, []);

  const getImageInfo = async () => {
    try {
      const apiUrl = `/api/info/${imageid}`;
      const response = await fetch(apiUrl, { cache: "no-store" });
      const jsonData = await response.json();
      setImageInfo(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownload = async () => {
    setButtonDisabled(true);
    try {
      if (code == "") {
        const freelink = document.createElement("a");
        freelink.href = imageUrl;
        freelink.download = `${imageid}.png`;
        document.body.appendChild(freelink);
        freelink.click();
        document.body.removeChild(freelink);
        setCodeError("");
      } else {
        const apiUrl = `/api/download/${imageid}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          setCodeError(data.error);
        } else {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `${imageid}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setCodeError("");
        }
      }
    } catch (error) {
      console.error("Error download:", error);
    }
    setCode("");
    setButtonDisabled(false);
  };

  return (
    <>
      <Navbar />
      <section className="py-8 sm:py-8">
        <div className="container mx-auto px-4">
          <nav className="flex">
            <ol role="list" className="flex items-center">
              <li className="text-left" key="image">
                <div className="flex items-center">
                  <div className="-m-1">
                    <Link
                      href="/"
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 hover:text-gray-800"
                    >
                      Images
                    </Link>
                  </div>
                </div>
              </li>

              <li className="text-left" key="imageid">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <div className="-m-1">
                    <p
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 hover:text-gray-800"
                      aria-current="page"
                    >
                      {imageid}
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="flex justify-center">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg mx-auto">
                    <Image
                      className="h-full w-full max-w-full object-cover"
                      src={imageUrl}
                      width={1000}
                      height={1000}
                      placeholder="blur"
                      blurDataURL="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {imageInfo.title}
              </h1>
              <span className="flex mt-4 text-sm font-bold text-gray-800">
                {new Date(imageInfo.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>

              <h2 className="mt-8 text-base text-gray-900">Tags</h2>
              <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                {imageInfo.tags.map((tag, index) => (
                  <Link href={`/tag/${tag}`}>
                    <p
                      key={index}
                      className="hover:bg-black hover:text-white rounded-lg border border-black px-6 py-2 font-bold"
                    >
                      {tag}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-10 items-center justify-between space-y-4 border-t">
                <h2 className="mt-4 text-base text-gray-900">Code</h2>
                <input
                  type="name"
                  name="search"
                  className="h-12 w-full cursor-text rounded-md border border-gray-400 bg-gray-100 py-4 px-6 shadow-sm outline-none focus:border-black focus:ring-opacity-50"
                  placeholder="Enter Code"
                  id="code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.trim());
                  }}
                />
                {codeError != "" ? (
                  <span class="mt-4 ml-2 text-sm font-bold text-red-500">
                    {codeError}
                  </span>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">Free</h1>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 disabled:bg-red-800 disabled:text-white disabled:cursor-no-drop"
                  onClick={handleDownload}
                  disabled={isButtonDisabled}
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

              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className=""
                    ></path>
                  </svg>
                  Copyright Free
                </li>
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                  Get Free ImageNet Code <Modal />
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <p
                    title=""
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  >
                    Description
                  </p>
                </nav>
              </div>

              <div className="mt-8 flow-root sm:mt-12">
                <p className="mb-4 font-medium text-gray-900">
                  {imageInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
