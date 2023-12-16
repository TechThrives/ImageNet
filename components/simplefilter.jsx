"use client";
import React, { useState } from "react";

export default function SimpleFilter({ onSearchTitleChange }) {
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
    onSearchTitleChange(e.target.value);
  };

  const handleReset = (e) => {
    setSearchTitle("");
    onSearchTitleChange("");
  };
  return (
    <div className="flex-row w-full my-5 m-10 max-w-4xl">
      <div className="relative mb-10 w-full flex items-center justify-between rounded-md">
        <svg
          className="absolute left-2 block h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" className=""></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
        </svg>
        <input
          type="name"
          name="search"
          className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Search by title or description"
          value={searchTitle}
          onChange={handleSearchTitleChange}
        />
      </div>

      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
        <button
          className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
