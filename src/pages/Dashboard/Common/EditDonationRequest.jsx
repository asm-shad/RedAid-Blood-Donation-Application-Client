import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import districtsData from "../../../assets/json/districts.json";
import upazilasData from "../../../assets/json/upazilas.json";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { TbFidgetSpinner } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EditDonationRequest = () => {
  const { id } = useParams();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch existing donation request data
  const { data: donationData, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-requests/${id}`);
      setSelectedDistrict(data.recipientDistrict);
      return data;
    },
  });

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
    setLoading(true);

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
      status: donationData.status, // Keep existing status
    };

    try {
      await axiosSecure.patch(`/donation-requests/${id}`, updatedRequest);
      Swal.fire("Success", "Donation request updated successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating donation request:", err);
      Swal.fire("Error", "Failed to update donation request.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Edit Donation Request | Dashboard</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="card w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-red-600">
              Edit Donation Request
            </h1>
            <p className="text-gray-600 mt-2">
              Update the details of your donation request here.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block font-medium text-gray-700">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  defaultValue={donationData?.recipientName || ""}
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
                    <option
                      key={district.id}
                      value={district.id}
                      selected={district.id === donationData?.recipientDistrict}
                    >
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
                    <option
                      key={upazila.id}
                      value={upazila.name}
                      selected={upazila.name === donationData?.recipientUpazila}
                    >
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  className="input input-bordered w-full"
                  required
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option
                        key={group}
                        value={group}
                        selected={group === donationData?.bloodGroup}
                      >
                        {group}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  defaultValue={donationData?.hospitalName || ""}
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
                defaultValue={donationData?.fullAddress || ""}
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
                defaultValue={donationData?.requestMessage || ""}
                required
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                defaultValue={donationData?.donationDate || ""}
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
                defaultValue={donationData?.donationTime || ""}
                required
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#EB2C29]"
              disabled={loading}
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Update Request"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDonationRequest;
