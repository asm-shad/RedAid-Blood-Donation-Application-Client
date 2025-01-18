import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      {/* Error Code */}
      <h1 className="text-9xl font-bold mb-4">404</h1>

      {/* Message */}
      <p className="text-2xl font-light mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-medium text-lg shadow-lg hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
      >
        <FaHome size={20} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
