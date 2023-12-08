import Filter from "../components/filter";
import Navbar from "../components/navbar";
import { cookies } from "next/headers";
import Card from "../components/card";

export default function HomePage({ username }) {
  return (
    <div className="h-screen flex-col">
      <div className="bg-white w-full top-0 z-50">
        <Navbar username={username} />
      </div>

      <div className="flex bg-white justify-center">
        <Filter />
      </div>

      <section class="bg-white py-6 text-gray-700 sm:py-6 lg:py-6">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-md text-center">
            <h2 class="font-serif text-2xl font-bold sm:text-3xl">
              Browse Images
            </h2>
          </div>

          <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mt-16">
            {[...Array(10)].map((_, index) => (
              <Card />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
