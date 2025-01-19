import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch blogs.json from the public folder
    fetch("/blogs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blogs.");
        }
        return response.json();
      })
      .then((data) => {
        const foundBlog = data.find((b) => b.id === id); // Match ID as a string
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError("Blog Not Found");
        }
      })
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-600">{error}</h2>
        <p className="text-gray-600">
          The blog you are looking for does not exist.
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-600">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div
        className="relative bg-gray-800 text-white"
        style={{
          backgroundImage: `url(${blog.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full absolute"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
          <p className="text-lg italic">Category: {blog.category}</p>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="container mx-auto py-12 px-4 lg:px-20">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            {/* Author Info */}
            <img
              src={blog.author.image}
              alt={blog.author.name}
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <div>
              <p className="text-lg font-bold">{blog.author.name}</p>
              <p className="text-gray-500 text-sm">{blog.author.email}</p>
            </div>
          </div>
          {/* Blog Content */}
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed">{blog.content}</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} My Blog Website. All rights reserved.
          </p>
          <p className="mt-2 text-gray-400">
            Sharing insights, knowledge, and inspiration through blogs.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetails;
