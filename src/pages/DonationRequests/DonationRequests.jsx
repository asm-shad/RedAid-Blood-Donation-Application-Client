import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import districtsData from "../../assets/json/districts.json"; // Import districts JSON directly

const DonationRequests = () => {
  const [districts, setDistricts] = useState([]); // State for districts
  const navigate = useNavigate();

  // Load districts on component mount
  useEffect(() => {
    setDistricts(districtsData); // Use the imported JSON data
  }, []);

  const { data: donationRequests, isLoading } = useQuery({
    queryKey: ["redLifeAid"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Helper function to get the district name by ID
  const getDistrictName = (districtId) => {
    if (!districtId) return "Unknown District"; // Handle undefined or null districtId
    const district = districts.find((d) => d.id === districtId.toString()); // Match ID as string
    return district ? district.name : "Unknown District";
  };

  // Handle view button click
  const handleView = (id) => {
    Swal.fire(
      "Information",
      "You can view more details on the next page.",
      "info"
    );
    navigate(`/donation-requests/${id}`);
  };

  return (
    <div>
      <Helmet>
        <title>Donation Requests | Dashboard</title>
      </Helmet>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to Donation Requests
          </h1>
          <p className="text-lg mb-6">
            Explore and fulfill blood donation requests to save lives.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#requests"
              className="px-6 py-3 bg-red-700 text-white font-medium rounded-lg shadow-md hover:bg-red-800 transition"
            >
              View Requests
            </a>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gray-100 py-10" id="requests">
        {/* Cards Section */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
          {donationRequests?.length > 0 ? (
            donationRequests.map((request) => (
              <div
                key={request._id}
                className="rounded-lg shadow-md p-6 bg-gradient-to-r from-pink-200 to-pink-100 hover:from-pink-300 hover:to-pink-200 transition"
              >
                {/* Recipient Name */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {request.recipientName || "Anonymous Recipient"}
                </h3>

                {/* District */}
                <p className="flex items-center text-gray-700 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  {getDistrictName(request.recipientDistrict)}
                </p>

                {/* Blood Group */}
                <p className="flex items-center text-gray-700 mb-2">
                  <span className="text-sm font-semibold px-2 py-1 bg-red-600 text-white rounded-lg mr-2">
                    {request.bloodGroup || "N/A"}
                  </span>
                  Blood Group
                </p>

                {/* Hospital Name */}
                <p className="flex items-center text-gray-700 mb-2">
                  <FaHospital className="mr-2 text-blue-500" />
                  {request.hospitalName || "Unknown Hospital"}
                </p>

                {/* Date */}
                <p className="flex items-center text-gray-700 mb-2">
                  <FaCalendarAlt className="mr-2 text-green-500" />
                  {request.donationDate || "Date Not Provided"}
                </p>

                {/* Time */}
                <p className="flex items-center text-gray-700 mb-4">
                  <FaClock className="mr-2 text-yellow-500" />
                  {request.donationTime || "Time Not Provided"}
                </p>

                {/* View Button */}
                <button
                  className="mt-auto w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleView(request._id)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 italic text-center">
              No donation requests available.
            </p>
          )}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="my-12 text-center">
        <p className="text-xl font-semibold text-gray-700">
          “Your donation can save lives. Spread awareness and inspire others.”
        </p>
        <span className="block mt-2 text-gray-500">– Anonymous</span>
      </div>
    </div>
  );
};

export default DonationRequests;
