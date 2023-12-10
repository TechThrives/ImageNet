"use client";
import React, { useState, useEffect } from "react";
import Filter from "../components/filter";
import Navbar from "../components/navbar";
import Card from "../components/card";

export default function HomePage() {
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState("desc");
  const [limit, setLimit] = useState(2);
  const [imageCount, setImageCount] = useState(12);

  async function getImageCount() {
    try {
      const response = await fetch("http://localhost:3000/api/image", {
        cache: "no-store",
      });
      const jsonData = await response.json();
      setImageCount(jsonData.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getImageCount();
    fetchImages();
  }, [searchTitle, tags, sort, limit]);

  const fetchImages = async () => {
    const allTags = tags.join(",");
    try {
      const apiUrl = `/api/image?s=${searchTitle}&tags=${allTags}&sort=${sort}&limit=${limit}`;
      console.log(apiUrl);
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) setFilteredImages(data);
        else setFilteredImages([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLoadMore = () => {
    setLimit(limit + 2);
    console.log(limit);
  };

  return (
    <div className="h-screen flex-col">
      <div className="bg-white w-full top-0 z-50">
        <Navbar />
      </div>

      <div className="flex bg-white justify-center">
        <Filter
          onSearchTitleChange={(title) => setSearchTitle(title)}
          onTagsChange={(newTags) => setTags(newTags)}
          onSortChange={(newSort) => setSort(newSort)}
        />
      </div>

      <section class="bg-white py-6 text-gray-700 sm:py-6 lg:py-6">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-md text-center">
            <h2 class="font-serif text-2xl font-bold sm:text-3xl">
              Browse Images
            </h2>
          </div>
          {filteredImages.length > 0 ? (
            <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mt-16">
              {filteredImages.map((image, index) => (
                <Card key={index} image={image} />
              ))}
            </div>
          ) : (
            <div class="mx-auto max-w-md text-center">
              <h2 class="mt-10 font-serif text-xl font-bold sm:text-xl">
                No Images
              </h2>
            </div>
          )}
          {imageCount > limit ? (
            <div class="mx-auto max-w-md text-center my-12">
              <button
                className="rounded-xl border-2 border-black px-6 py-2 font-medium text-black hover:bg-black hover:text-white"
                onClick={handleLoadMore}
              >
                Load More Image
              </button>
            </div>
          ) : (
            <div className="my-12"></div>
          )}
        </div>
      </section>
    </div>
  );
}
