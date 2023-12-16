export default function NotFound() {
  return (
    <div class="bg-gray-100 h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Not Found</h1>
        <p class="text-lg text-gray-600 mb-8">
          The page you're looking for might be under construction or does not
          exist.
        </p>
        <a href="/" class="text-blue-500 hover:underline">
          Go back to home
        </a>
      </div>
    </div>
  );
}
