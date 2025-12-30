import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition">
          BeyondChats
        </Link>
        {/* <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-black transition"
        >
          ← Back to Blog List
        </Link> */}
      </div>
    </nav>
  );
}
