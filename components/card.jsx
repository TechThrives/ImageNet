import Link from "next/link";

export default function Card({ image }) {
  const imageUrl = `/images/${image.uid}`;
  const url = `/api/image/${image.uid}`;
  return (
    <article class="relative flex flex-col overflow-hidden rounded-lg border">
      <Link href={imageUrl} class="aspect-square overflow-hidden">
        <img
          class="h-full w-full object-cover transition-all duration-300 hover:scale-125"
          src={url}
          alt=""
        />
      </Link>
      <div class="absolute top-0 m-2 rounded-full bg-white">
        <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
          Sale
        </p>
      </div>

      <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div class="flex items-center justify-between mb-2 w-full">
          <h3 class="text-sm font-semibold">{image.title}</h3>
        </div>

        <p class="text-sm text-gray-400">{image.description}</p>
      </div>

      <Link
        href={imageUrl}
        class="group border-2 border-black mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
      >
        <div class="flex w-full items-center justify-center bg-white text-xs uppercase transition group-hover:bg-black group-hover:text-white">
          View
        </div>
        <div class="flex items-center border-l-2 border-black justify-center bg-white px-5 transition group-hover:bg-black group-hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </Link>
    </article>
  );
}
