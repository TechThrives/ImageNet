"use client";
import React, { useState } from "react";

export default function Filter({
  onSearchTitleChange,
  onTagsChange,
  onSortChange,
}) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [searchSort, setSearchSort] = useState("desc");

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
    onSearchTitleChange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSearchSort(e.target.value);
    onSortChange(e.target.value);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...searchTags];
    updatedTags.splice(index, 1);
    setSearchTags(updatedTags);
    onTagsChange(updatedTags);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      setSearchTags((prevTags) => [...prevTags, newTag]);
      e.target.value = "";
      onTagsChange([...searchTags, newTag.trim()]);
    }
  };

  const handleReset = (e) => {
    setSearchTitle("");
    setSearchTags([]);
    setSearchSort("desc");
    onSearchTitleChange("");
    onTagsChange([]);
    onSortChange("desc");
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid-cols-1 space-y-2">
          <label className="text-sm font-medium text-stone-600">Add Tags</label>
          <input
            className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            type="text"
            placeholder="Enter tags"
            name="tags"
            onKeyDown={handleAddTag}
          />
          <div className="flex flex-wrap mt-2">
            {searchTags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-100 inline-flex items-center text-sm rounded mr-1 mt-1"
              >
                <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
                  {tag}
                </span>
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 fill-current mx-auto"
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
        </div>

        <div className="flex flex-col">
          <label htmlFor="sort" className="text-sm font-medium text-stone-600">
            Sort
          </label>

          <select
            id="sort"
            className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={searchSort}
            onChange={handleSortChange}
          >
            <option value="desc">Latest Uploaded</option>
            <option value="asc">Older</option>
          </select>
        </div>
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
