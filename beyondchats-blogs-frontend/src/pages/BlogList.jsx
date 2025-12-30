import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchArticles().then(setBlogs);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">Latest Blogs</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {blogs.map(blog => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="group border rounded-xl p-6 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold group-hover:text-black">
              {blog.title}
            </h2>

            <p className="text-gray-500 mt-3 text-sm line-clamp-3">
              Click to read the full article →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

