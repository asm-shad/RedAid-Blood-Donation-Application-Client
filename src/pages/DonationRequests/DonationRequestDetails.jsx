import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaQuoteLeft,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaTint,
} from "react-icons/fa";
import Container from "../../components/Container/Container";
import Heading from "../../components/Heading/Heading";
import DonationModal from "../Modal/DonationModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch donation request details
  const { data: requestDetails = {}, isLoading: isLoadingRequest } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
      );
      return data;
    },
  });

  // Fetch motivational quote
  const { data: quoteData = {}, isLoading: isLoadingQuote } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/quote`);
      return data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    requesterName,
    requesterEmail,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    fullAddress,
    bloodGroup,
    donationDate,
    donationTime,
    requestMessage,
    status,
  } = requestDetails;

  const { quote, author } = quoteData;

  if (isLoadingRequest || isLoadingQuote) return <LoadingSpinner />;

  return (
    <Container className="min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Donation Request Details</title>
      </Helmet>
      {/* Parent container with flex */}
      <div className="flex flex-col lg:flex-row mx-auto w-full max-w-6xl items-stretch">
        {/* Left Section - Quote */}
        <div className="flex-1 flex items-center justify-center bg-red-50 p-6 rounded-lg shadow-md">
          <div className="text-center text-red-600 max-w-md">
            <FaQuoteLeft size={40} className="mx-auto mb-4" />
            <p className="text-xl italic">
              {quote || "Giving is not just about making a donation."}
            </p>
            <p className="text-right font-semibold mt-2">
              - {author || "Unknown"}
            </p>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <Heading
            title={`Blood Donation Request for ${recipientName}`}
            subtitle={`Blood Group: ${bloodGroup}`}
            className="text-red-600"
          />
          <hr className="my-4 border-red-500" />
          <div className="space-y-4 text-neutral-700">
            <p>
              <FaUser className="inline text-red-600 mr-2" />
              <strong>Requester Name:</strong> {requesterName}
            </p>
            <p>
              <FaEnvelope className="inline text-red-600 mr-2" />
              <strong>Requester Email:</strong> {requesterEmail}
            </p>
            <p>
              <FaMapMarkerAlt className="inline text-red-600 mr-2" />
              <strong>Recipient District:</strong> {recipientDistrict}
            </p>
            <p>
              <FaMapMarkerAlt className="inline text-red-600 mr-2" />
              <strong>Recipient Upazila:</strong> {recipientUpazila}
            </p>
            <p>
              <FaTint className="inline text-red-600 mr-2" />
              <strong>Hospital Name:</strong> {hospitalName}
            </p>
            <p>
              <FaMapMarkerAlt className="inline text-red-600 mr-2" />
              <strong>Full Address:</strong> {fullAddress}
            </p>
            <p>
              <FaTint className="inline text-red-600 mr-2" />
              <strong>Donation Date:</strong>{" "}
              {new Date(donationDate).toLocaleDateString()}
            </p>
            <p>
              <FaTint className="inline text-red-600 mr-2" />
              <strong>Donation Time:</strong> {donationTime}
            </p>
            <p>
              <FaUser className="inline text-red-600 mr-2" />
              <strong>Request Message:</strong> {requestMessage || "N/A"}
            </p>
            <p>
              <FaTint className="inline text-red-600 mr-2" />
              <strong>Status:</strong>{" "}
              <span
                className={
                  status === "pending" ? "text-yellow-500" : "text-green-500"
                }
              >
                {status}
              </span>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setIsOpen(true)}
              label={
                status === "pending" ? "Donate Now" : "Donation In Progress"
              }
              className={`py-2 px-6 rounded-lg text-white ${
                status === "pending"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400"
              }`}
              disabled={status !== "pending"}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <DonationModal
        requestDetails={requestDetails}
        closeModal={closeModal}
        isOpen={isOpen}
        refetch={() => {}}
      />
    </Container>
  );
};

export default DonationRequestDetails;
