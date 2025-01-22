import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

const ContentManagement = () => {
  // const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const closeModal = () => setIsOpen(false);

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["redLifeAid"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      return data;
    },
  });

  // Handle status update
  const handleStatus = async (blogId) => {
    try {
      console.log("Updating status for request ID:", blogId);
      const { data } = await axiosSecure.patch(`/blogs/status/${blogId}`);
      toast.success("Successfully Request Status Changed");
      refetch();
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
      toast.error("Request Status Change Failed");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = (id) => {
    setDeletingBlogId(id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingBlogId) return;

    try {
      // Use axiosSecure for DELETE request
      await axiosSecure.delete(`/blogs/${deletingBlogId}`);
      refetch(); // Refetch data after deletion

      // Show success toast
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The donation request has been deleted.",
        timer: 2000, // Toast will disappear after 2 seconds
        showConfirmButton: false,
      });

      closeModal(); // Close modal after deletion
      setDeletingBlogId(null); // Clear the request ID
    } catch (error) {
      console.error("Error deleting donation request:", error);

      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the donation request.",
        timer: 2000, // Toast will disappear after 2 seconds
        showConfirmButton: false,
      });

      closeModal(); // Close modal if error occurs
    }
  };

  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((blog) => blog.status === filter);

  const totalItems = filteredBlogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#F4F5F7] to-[#E6E8EB] min-h-screen">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedBlogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <img
                src={blog.thumbnail || "https://via.placeholder.com/150"}
                alt={blog.title}
                className="rounded-lg mb-4 object-cover h-40 w-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {blog.title || "Untitled Blog"}
              </h3>
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

            <div className="mt-4 flex flex-col justify-between items-center gap-4">
              {/* Publish/Unpublish Button */}
              <button
                className={`w-full px-4 py-2 text-white font-medium rounded-lg shadow-md ${
                  blog.status === "draft"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                onClick={() => handleStatus(blog._id)}
              >
                {blog.status === "draft" ? "Publish" : "Unpublish"}
              </button>

              {/* Edit and Delete Buttons */}
              <div className="flex justify-between items-center gap-4 w-full">
                <Link
                  to={`/dashboard/admin/content-management/edit-blog/${blog._id}`}
                  className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 flex justify-center items-center gap-2"
                >
                  <FiEdit />
                  <span>Edit</span>
                </Link>
                <button
                  className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 flex justify-center items-center gap-2"
                  onClick={() => handleDelete(blog._id)}
                >
                  <FiTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContentManagement;
