import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUpload } from "react-icons/fi";
import { imageUpload } from "../../../api/utils"; // Ensure this function exists and works
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [blogContent, setBlogContent] = useState(""); // Blog content state

  const editor = useRef(null);

  const config = {
    readonly: false, // Allow editing
    toolbar: true, // Show the toolbar
    height: 400, // Set editor height
    placeholder: "Write your blog content here...",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const thumbnail = form.thumbnail.files[0];

    try {
      // Validate image file
      if (!thumbnail) {
        Swal.fire(
          "Error!",
          "Please upload an image for the thumbnail.",
          "error"
        );
        setLoading(false);
        return;
      }

      // Upload thumbnail image
      let thumbnailUrl = "";
      try {
        thumbnailUrl = await imageUpload(thumbnail); // Call your image upload function
      } catch (err) {
        console.error("Image upload failed:", err);
        Swal.fire("Error!", "Image upload failed. Please try again.", "error");
        setLoading(false);
        return;
      }

      // Prepare blog data
      const blogData = {
        title,
        content: blogContent,
        category,
        thumbnail: thumbnailUrl,
        status: "draft",
        author: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      };

      // Post blog data
      const response = await axiosSecure.post("/blogs", blogData);

      if (response.status === 200 || response.status === 201) {
        Swal.fire(
          "Success!",
          "Your blog has been added successfully!",
          "success"
        );

        // Reset form and state
        form.reset();
        setBlogContent("");
        setUploadImage(null);
        setPreviewImage(null);
      }
    } catch (err) {
      console.error("Failed to add the blog:", err);
      Swal.fire(
        "Error!",
        "Failed to add the blog. Please try again or check your inputs.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

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
        // 2MB limit
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

  return (
    <div className="min-h-screen py-10">
      <Helmet>
        <title>Add Blog | Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
          Add New Health & Blood Blog
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
                "Add Blog"
              )}
            </button>
          </div>
        </form>
        {/* Motivational Quote */}
        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-gray-700">
            “Your donation can save lives. Spread awareness and inspire others.”
          </p>
          <span className="block mt-2 text-gray-500">– Anonymous</span>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
