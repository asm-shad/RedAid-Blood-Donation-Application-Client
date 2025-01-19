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
      <div className="min-h-screen bg-gray-100 py-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Donation Requests
          </h1>
          <p className="text-gray-600 italic mt-2">
            "You don't have to be a doctor to save a life. Just donate blood." –
            Anonymous
          </p>
        </div>

        {/* Cards Section */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
          {donationRequests?.length > 0 ? (
            donationRequests.map((request) => (
              <div
                key={request._id}
                className="rounded-lg shadow-md p-6 bg-gradient-to-r from-pink-300 to-pink-200 hover:from-pink-400 hover:to-pink-300 transition"
              >
                {/* Recipient Name */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {request.recipientName}
                </h3>

                {/* District */}
                <p className="flex items-center text-gray-700 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  {getDistrictName(request.recipientDistrict)}
                </p>

                {/* Blood Group */}
                <p className="flex items-center text-gray-700 mb-2">
                  <span className="text-sm font-semibold px-2 py-1 bg-red-600 text-white rounded-lg mr-2">
                    {request.bloodGroup}
                  </span>
                  Blood Group
                </p>

                {/* Hospital Name */}
                <p className="flex items-center text-gray-700 mb-2">
                  <FaHospital className="mr-2 text-blue-500" />
                  {request.hospitalName}
                </p>

                {/* Date */}
                <p className="flex items-center text-gray-700 mb-2">
                  <FaCalendarAlt className="mr-2 text-green-500" />
                  {request.donationDate}
                </p>

                {/* Time */}
                <p className="flex items-center text-gray-700 mb-4">
                  <FaClock className="mr-2 text-yellow-500" />
                  {request.donationTime}
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
      <div className="mt-12 text-center">
        <p className="text-xl font-semibold text-gray-700">
          “Your donation can save lives. Spread awareness and inspire others.”
        </p>
        <span className="block mt-2 text-gray-500">– Anonymous</span>
      </div>
    </div>
  );
};

export default DonationRequests;
