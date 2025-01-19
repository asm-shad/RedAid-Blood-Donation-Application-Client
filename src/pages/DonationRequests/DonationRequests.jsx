import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const DonationRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]); // Store pending requests
  const [districts, setDistricts] = useState([]); // Store districts
  const [upazilas, setUpazilas] = useState([]); // Store upazilas
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Check if the user is logged in

  // Fetch all pending donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/donation-requests?status=pending");
        const data = await response.json();
        setDonationRequests(data);
      } catch (err) {
        console.error("Error fetching donation requests:", err);
        Swal.fire("Error", "Unable to fetch donation requests.", "error");
      }
    };

    const fetchDistricts = async () => {
      try {
        const response = await fetch("/districts.json"); // Public folder path
        const data = await response.json();
        setDistricts(data);
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    };

    const fetchUpazilas = async () => {
      try {
        const response = await fetch("/upazilas.json"); // Public folder path
        const data = await response.json();
        setUpazilas(data);
      } catch (err) {
        console.error("Error fetching upazilas:", err);
      }
    };

    fetchRequests();
    fetchDistricts();
    fetchUpazilas();
  }, []);

  // Handle view button click
  const handleView = (id) => {
    if (!isAuthenticated) {
      Swal.fire(
        "Unauthorized",
        "Please login to view the request details.",
        "warning"
      );
      navigate("/login"); // Redirect to login page if not authenticated
    } else {
      navigate(`/donation-requests/${id}`); // Redirect to the donation request details page
    }
  };

  return (
    <div>
      <Helmet>
        <title>Donation Requests | Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Pending Donation Requests
        </h1>
        <p className="text-gray-600 italic mb-6">
          "You don't have to be a doctor to save a life. Just donate blood." –
          Anonymous
        </p>

        {/* Requests Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {donationRequests.length > 0 ? (
            donationRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col"
              >
                {/* Recipient Name */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {request.recipientName}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {request.recipientDistrict},{" "}
                  {request.recipientUpazila}
                </p>

                {/* Blood Group */}
                <p className="text-sm text-gray-600">
                  <strong>Blood Group:</strong>{" "}
                  <span className="text-red-500 font-bold">
                    {request.bloodGroup}
                  </span>
                </p>

                {/* Date and Time */}
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {request.donationDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {request.donationTime}
                </p>

                {/* View Button */}
                <button
                  className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleView(request.id)}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 italic">
              No pending donation requests available.
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
