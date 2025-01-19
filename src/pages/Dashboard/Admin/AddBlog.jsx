import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Default Draft.js styles
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUpload } from "react-icons/fi";

const AddBlog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const thumbnail = form.thumbnail.files[0];
    const content = editorState.getCurrentContent().getPlainText(); // Extract plain text from editor

    try {
      // Upload thumbnail image
      const thumbnailUrl = await imageUpload(thumbnail);

      // Prepare blog data
      const blogData = {
        title,
        content,
        category,
        thumbnail: thumbnailUrl,
        author: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      };

      // Post blog data
      await axiosSecure.post("/blogs", blogData);
      Swal.fire(
        "Success!",
        "Your blog has been added successfully!",
        "success"
      );

      // Reset form and state
      form.reset();
      setEditorState(EditorState.createEmpty());
      setUploadImage(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add the blog. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <Helmet>
        <title>Add Blog | Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
          Add New Blog
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
            <label htmlFor="content" className="block text-lg font-semibold">
              Blog Content
            </label>
            <div
              className="border border-gray-300 rounded-lg shadow-sm p-4"
              style={{ minHeight: "300px" }}
            >
              <Editor
                editorState={editorState}
                onChange={handleEditorChange}
                handleKeyCommand={handleKeyCommand}
                placeholder="Write your blog content here..."
              />
            </div>
            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                onClick={() => toggleInlineStyle("BOLD")}
              >
                Bold
              </button>
              <button
                type="button"
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                onClick={() => toggleInlineStyle("ITALIC")}
              >
                Italic
              </button>
              <button
                type="button"
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                onClick={() => toggleInlineStyle("UNDERLINE")}
              >
                Underline
              </button>
            </div>
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
                required
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUploadImage(file ? file : null);
                }}
              />
              <label
                htmlFor="thumbnail"
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
              >
                <FiUpload className="mr-2" />
                {uploadImage?.name || "Upload Image"}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 text-white font-semibold rounded-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Loading..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
