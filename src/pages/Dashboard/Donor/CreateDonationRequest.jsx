import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import districtsData from "../../../../public/districts.json";
import upazilasData from "../../../../public/upazilas.json";
import useAuth from "../../../hooks/useAuth";

const CreateDonationRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setDistricts(districtsData);
  }, []);

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

    if (!isAuthenticated || user.status !== "active") {
      Swal.fire(
        "Access Denied",
        "Blocked users cannot create requests.",
        "error"
      );
      return;
    }

    const form = e.target;
    const newRequest = {
      requesterName: user.name,
      requesterEmail: user.email,
      recipientName: form.recipientName.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: "pending",
    };

    try {
      const response = await fetch("/api/donation-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to create donation request.");
      }

      Swal.fire("Success", "Donation request created successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating donation request:", err);
      Swal.fire("Error", "Failed to create donation request.", "error");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        background: "linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC)",
      }}
    >
      <div className="card w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Donation Request
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
            {loading ? "Submitting..." : "Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
