import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // Store existing thumbnail URL
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();

  // Fetch existing blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details.");
        }
        const data = await response.json();
        setTitle(data.title);
        setThumbnailUrl(data.thumbnail);
        setContent(data.content);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        Swal.fire("Error", "Unable to fetch the blog details.", "error");
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedThumbnailUrl = thumbnailUrl;

    // If a new thumbnail is uploaded, upload it to imageBB
    if (thumbnail) {
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
        updatedThumbnailUrl = data.data.url;
      } catch (err) {
        console.error("Error uploading thumbnail:", err);
        Swal.fire("Error", "Failed to upload thumbnail image.", "error");
        return;
      }
    }

    // Prepare updated blog data
    const updatedBlog = {
      title,
      thumbnail: updatedThumbnailUrl,
      content,
    };

    // Send the updated blog data to the server
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog.");
      }

      Swal.fire("Success", "Blog updated successfully!", "success");
      navigate("/dashboard/content-management");
    } catch (err) {
      console.error("Error updating blog:", err);
      Swal.fire("Error", "Failed to update blog.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        {title ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blog Title */}
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-gray-700"
              >
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
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Current Thumbnail"
                  className="rounded-md mb-4 h-40 object-cover"
                />
              )}
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="input input-bordered w-full"
              />
              <p className="text-sm text-gray-600 mt-1">
                Upload a new thumbnail to replace the current one.
              </p>
            </div>

            {/* Blog Content */}
            <div>
              <label
                htmlFor="content"
                className="block font-medium text-gray-700"
              >
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
              Update Blog
            </button>
          </form>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
