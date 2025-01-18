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
        const foundBlog = data.find((b) => b.id === parseInt(id));
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
    <div className="mx-auto py-8 px-4 bg-gradient-to-r from-red-500 to-yellow-500">
      <div className="container mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Improve image quality with proper scaling */}
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-[350px] object-cover" // Ensure the image scales correctly
          loading="lazy" // Lazy load the image for performance
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-800 leading-relaxed h-auto">
            {blog.content}
          </p>{" "}
          {/* Adjust height as needed */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
