import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-4 bg-white rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          href={"/"}
          className="inline-block px-6 py-2 bg-blue-400 text-white rounded font-medium hover:bg-blue-300 transition duration-300"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}
