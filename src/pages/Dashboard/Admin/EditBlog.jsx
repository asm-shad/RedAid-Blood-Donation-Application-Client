import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUpload } from "react-icons/fi";
import { TbFidgetSpinner } from "react-icons/tb";
import JoditEditor from "jodit-react";
import { imageUpload } from "../../../api/utils";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const EditBlog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams(); // Blog ID from URL params
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null); // Blog data fetched from server
  const [blogContent, setBlogContent] = useState(""); // Blog content for editor
  const [uploadImage, setUploadImage] = useState(null); // Image file
  const [previewImage, setPreviewImage] = useState(null); // For preview
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const editor = useRef(null);

  const config = {
    readonly: false,
    toolbar: true,
    height: 400,
    placeholder: "Write your blog content here...",
  };

  // Fetch blog details by ID
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axiosSecure.get(`/blogs/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setBlogData(data);
          setBlogContent(data.content);
          setPreviewImage(data.thumbnail);
        } else {
          Swal.fire("Error!", "Blog not found.", "error");
          navigate("/dashboard/blogs"); // Redirect to blog list if not found
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch blog details.", "error");
        console.error(error);
        navigate("/dashboard/blogs");
      } finally {
        setFetching(false);
      }
    };

    fetchBlogData();
  }, [id, axiosSecure, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;

    try {
      // Check if a new image is uploaded
      let thumbnailUrl = blogData.thumbnail;
      if (uploadImage) {
        try {
          thumbnailUrl = await imageUpload(uploadImage);
        } catch (err) {
          Swal.fire(
            "Error!",
            "Image upload failed. Please try again.",
            "error"
          );
          setLoading(false);
          return;
        }
      }

      // Prepare updated blog data
      const updatedBlogData = {
        title,
        content: blogContent,
        category,
        thumbnail: thumbnailUrl,
      };

      // Update the blog via API
      const response = await axiosSecure.patch(`/blogs/${id}`, updatedBlogData);

      if (response.status === 200) {
        Swal.fire("Success!", "Blog updated successfully!", "success");
        navigate("/dashboard/admin/content-management");
      }
    } catch (err) {
      console.error("Failed to update the blog:", err);
      Swal.fire(
        "Error!",
        "Failed to update the blog. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire("Error!", "Please upload a valid image file.", "error");
        setUploadImage(null);
        setPreviewImage(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire("Error!", "Image size must be less than 2MB.", "error");
        setUploadImage(null);
        setPreviewImage(null);
        return;
      }
      setUploadImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setUploadImage(null);
      setPreviewImage(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <Helmet>
        <title>Edit Blog | Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
          Edit Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={blogData.title}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
              placeholder="Enter your blog title"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label
              htmlFor="blogContent"
              className="block text-lg font-semibold"
            >
              Blog Content
            </label>
            <JoditEditor
              ref={editor}
              value={blogContent}
              config={config}
              onBlur={(newContent) => setBlogContent(newContent)} // Update state on blur
              onChange={(newContent) => setBlogContent(newContent)} // Update state on change
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-lg font-semibold">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={blogData.category}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
            >
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
              <option value="Nutrition">Nutrition</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="thumbnail" className="block text-lg font-semibold">
              Blog Thumbnail
            </label>
            <div className="flex items-center mt-2 gap-4">
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="thumbnail"
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
              >
                <FiUpload className="mr-2" />
                {uploadImage?.name || "Upload Image"}
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-20 w-20 rounded-lg border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full p-3 text-center font-medium text-white transition duration-200 rounded-lg shadow-md ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto text-xl" />
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
