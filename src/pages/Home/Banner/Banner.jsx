import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../../assets/banner.jpg";

const Banner = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  return (
    <div
      className="hero h-[50vh] relative" // Height set to 50% of the screen
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-20 bg-black"></div>
      <div className="hero-content flex flex-col justify-center items-start pl-10 text-neutral-content text-left max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          SMS-based platform to connect blood searchers with donors
        </h1>
        <p className="text-lg mb-6 text-white">
          Join our community of life savers. Donate blood and make a real
          difference. One donation can save up to three lives.
        </p>
        <div className="flex gap-4">
          <button
            className="btn bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            onClick={() => navigate("/register")}
          >
            Join as a Donor
          </button>
          <button
            className="btn bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transform transition duration-300"
            onClick={() => navigate("/search")}
          >
            Search Donors
          </button>
        </div>
      </div>

      {/* Zigzag Divider */}
      <div className="absolute bottom-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,256L60,224C120,192,240,128,360,128C480,128,600,192,720,192C840,192,960,128,1080,96C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
