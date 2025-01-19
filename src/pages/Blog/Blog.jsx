import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Blog = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["redLifeAid"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/blogs`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  // const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   // Fetch blogs.json from the public folder
  //   fetch("/blogs.json")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch blogs.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setBlogs(data))
  //     .catch((error) => console.error("Error fetching blogs:", error));
  // }, []);

  return (
    <div>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Published Blogs | Blogs</title>
        <meta
          name="description"
          content="Explore the latest blogs on various topics, including health, fitness, nutrition, and more."
        />
        <meta
          name="keywords"
          content="blogs, health blogs, fitness blogs, nutrition blogs"
        />
        <meta name="author" content="My Blog Website" />
      </Helmet>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to the Blog Hub
          </h1>
          <p className="text-lg mb-6">
            Discover insightful blogs on health, fitness, nutrition, and more.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/create-blog"
              className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Create a Blog
            </Link>
            <a
              href="#blogs"
              className="px-6 py-3 bg-red-700 text-white font-medium rounded-lg shadow-md hover:bg-red-800 transition"
            >
              Explore Blogs
            </a>
          </div>
        </div>
      </header>

      {/* Blog List Section */}
      <div className="container mx-auto py-8 px-4" id="blogs">
        <h2 className="text-3xl font-bold mb-6 text-center">Published Blogs</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="mt-4 inline-block text-red-600 hover:underline font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
