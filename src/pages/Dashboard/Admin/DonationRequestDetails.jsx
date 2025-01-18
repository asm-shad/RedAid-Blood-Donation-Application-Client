import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const DonationRequestDetails = () => {
  const { id } = useParams(); // Get the donation request ID from the URL
  const [requestDetails, setRequestDetails] = useState(null); // Store request data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { user } = useAuth(); // Get logged-in user details
  const navigate = useNavigate();

  // Fetch donation request details (replace with actual API call)
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`/api/donation-requests/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch donation request details.");
        }
        const data = await response.json();
        setRequestDetails(data);
      } catch (err) {
        console.error("Error fetching donation request details:", err);
        Swal.fire("Error", "Unable to fetch the donation request.", "error");
      }
    };

    fetchRequestDetails();
  }, [id]);

  // Handle donation confirmation
  const handleConfirmDonation = async () => {
    try {
      const response = await fetch(`/api/donation-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "inprogress", donor: user }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm donation.");
      }

      Swal.fire("Success", "Donation confirmed successfully!", "success");
      setIsModalOpen(false);
      navigate("/dashboard/my-donation-requests"); // Redirect to donation requests page
    } catch (err) {
      console.error("Error confirming donation:", err);
      Swal.fire("Error", "Failed to confirm donation.", "error");
    }
  };

  if (!requestDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Donation Request Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        {/* Request Details */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Request Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-600">Requester Name:</p>
            <p className="text-gray-800">{requestDetails.requesterName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Requester Email:</p>
            <p className="text-gray-800">{requestDetails.requesterEmail}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Recipient Name:</p>
            <p className="text-gray-800">{requestDetails.recipientName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Blood Group:</p>
            <p className="text-gray-800">{requestDetails.bloodGroup}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Hospital Name:</p>
            <p className="text-gray-800">{requestDetails.hospitalName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Full Address:</p>
            <p className="text-gray-800">{requestDetails.fullAddress}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Donation Date:</p>
            <p className="text-gray-800">{requestDetails.donationDate}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Donation Time:</p>
            <p className="text-gray-800">{requestDetails.donationTime}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-600">Request Message:</p>
            <p className="text-gray-800">{requestDetails.requestMessage}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Donate
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Donation
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-600">Donor Name:</p>
                <p className="text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Donor Email:</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleConfirmDonation}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
