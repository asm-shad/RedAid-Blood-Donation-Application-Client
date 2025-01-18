import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      Swal.fire("Error", "Please upload a thumbnail image.", "error");
      return;
    }

    // Upload thumbnail to imageBB and get the URL
    let thumbnailUrl = "";
    try {
      const formData = new FormData();
      formData.append("image", thumbnail);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=YOUR_IMAGEBB_API_KEY`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      thumbnailUrl = data.data.url;
    } catch (err) {
      console.error("Error uploading thumbnail:", err);
      Swal.fire("Error", "Failed to upload thumbnail image.", "error");
      return;
    }

    // Create a new blog
    const newBlog = {
      title,
      thumbnail: thumbnailUrl,
      content,
      status: "draft", // Default status
    };

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog.");
      }

      Swal.fire("Success", "Blog created successfully!", "success");
      navigate("/dashboard/content-management");
    } catch (err) {
      console.error("Error creating blog:", err);
      Swal.fire("Error", "Failed to create blog.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Blog</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block font-medium text-gray-700"
            >
              Thumbnail Image
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label htmlFor="content" className="block font-medium text-gray-700">
              Blog Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
              className="border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
