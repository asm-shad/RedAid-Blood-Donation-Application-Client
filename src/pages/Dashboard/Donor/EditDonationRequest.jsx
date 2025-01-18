import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import districtsData from "../../../../public/districts.json";
import upazilasData from "../../../../public/upazilas.json";
import useAuth from "../../../hooks/useAuth";

const EditDonationRequest = () => {
  const { id } = useParams(); // Get the request ID from the URL
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [formData, setFormData] = useState(null); // Store request data to edit
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch districts and the current donation request details
  useEffect(() => {
    setDistricts(districtsData);

    // Fetch the existing donation request details
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`/api/donation-requests/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch donation request.");
        }
        const data = await response.json();
        setFormData(data);
        setSelectedDistrict(data.recipientDistrict); // Set the district for upazila filtering
      } catch (err) {
        console.error("Error fetching donation request:", err);
        Swal.fire(
          "Error",
          "Unable to fetch the donation request details.",
          "error"
        );
      }
    };

    fetchRequestDetails();
  }, [id]);

  // Update upazilas when the district changes
  useEffect(() => {
    if (selectedDistrict) {
      const filteredUpazilas = upazilasData.filter(
        (upazila) => upazila.district_id === selectedDistrict
      );
      setUpazilas(filteredUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedRequest = {
      recipientName: form.recipientName.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
    };

    try {
      const response = await fetch(`/api/donation-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to update donation request.");
      }

      Swal.fire("Success", "Donation request updated successfully!", "success");
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      console.error("Error updating donation request:", err);
      Swal.fire("Error", "Failed to update donation request.", "error");
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        background: "linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC)",
      }}
    >
      <div className="card w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Edit Donation Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium text-gray-700">
                Requester Name
              </label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Requester Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                defaultValue={formData.recipientName}
                placeholder="Enter recipient's name"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Recipient District
              </label>
              <select
                name="recipientDistrict"
                className="input input-bordered w-full"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Recipient Upazila
              </label>
              <select
                name="recipientUpazila"
                className="input input-bordered w-full"
                defaultValue={formData.recipientUpazila}
                required
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Hospital Name
              </label>
              <input
                type="text"
                name="hospitalName"
                defaultValue={formData.hospitalName}
                placeholder="Enter hospital name"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Full Address
            </label>
            <input
              type="text"
              name="fullAddress"
              defaultValue={formData.fullAddress}
              placeholder="Enter full address"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Request Message
            </label>
            <textarea
              name="requestMessage"
              defaultValue={formData.requestMessage}
              placeholder="Write your message here..."
              required
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                className="input input-bordered w-full"
                defaultValue={formData.bloodGroup}
                required
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                defaultValue={formData.donationDate}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                defaultValue={formData.donationTime}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn w-full text-white bg-[#EB2C29] hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
