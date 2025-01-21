import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]); // Store blogs data
  const [filter, setFilter] = useState("all"); // Blog status filter
  const navigate = useNavigate();

  // Fetch blogs data (replace with actual API call)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  // Handle publishing/unpublishing a blog
  const handlePublishToggle = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/blogs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog status.");
      }

      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, status: newStatus } : blog
      );
      setBlogs(updatedBlogs);

      Swal.fire(
        "Success",
        `Blog has been ${
          newStatus === "published" ? "published" : "unpublished"
        } successfully!`,
        "success"
      );
    } catch (err) {
      console.error("Error updating blog status:", err);
      Swal.fire("Error", "Failed to update blog status.", "error");
    }
  };

  // Handle deleting a blog
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete blog.");
      }

      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);

      Swal.fire("Success", "Blog deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting blog:", err);
      Swal.fire("Error", "Failed to delete blog.", "error");
    }
  };

  // Filtered blogs based on status
  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((blog) => blog.status === filter);

  return (
    <div className="p-6 bg-gradient-to-r from-[#F4F5F7] to-[#E6E8EB] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Content Management
        </h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700"
          onClick={() =>
            navigate("/dashboard/admin/content-management/add-blog")
          }
        >
          <FiPlus className="text-lg" />
          Add Blog
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <label htmlFor="filter" className="text-lg font-semibold text-gray-700">
          Filter by Status:
        </label>
        <select
          id="filter"
          className="ml-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blogs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            {/* Blog Thumbnail */}
            <div>
              <img
                src={blog.thumbnail || "https://via.placeholder.com/150"}
                alt={blog.title}
                className="rounded-lg mb-4 object-cover h-40 w-full"
              />
              {/* Blog Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {blog.title || "Untitled Blog"}
              </h3>
              {/* Blog Status */}
              <p className="text-sm font-medium text-gray-600">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    blog.status === "published"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {blog.status}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center">
              <button
                className={`flex-1 px-4 py-2 text-white font-medium rounded-lg shadow-md ${
                  blog.status === "draft"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                onClick={() =>
                  handlePublishToggle(
                    blog.id,
                    blog.status === "draft" ? "published" : "draft"
                  )
                }
              >
                {blog.status === "draft" ? "Publish" : "Unpublish"}
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                  onClick={() =>
                    navigate(
                      `/dashboard/content-management/edit-blog/${blog.id}`
                    )
                  }
                >
                  <FiEdit />
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                  onClick={() => handleDelete(blog.id)}
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
