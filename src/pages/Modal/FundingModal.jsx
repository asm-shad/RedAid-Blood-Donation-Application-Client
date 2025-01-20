/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton, // Import Menu
} from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const FundingModal = ({ closeModal, isOpen, refetch }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donationAmount, setDonationAmount] = useState(5);
  const [fundingInfo, setFundingInfo] = useState({
    userId: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    status: user?.status,
    amount: donationAmount,
  });

  // Handle input change for donation amount
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 5) {
      setDonationAmount(5);
      return toast.error("Maximum donation is $5");
    }
    setDonationAmount(value);
    setFundingInfo((prev) => ({ ...prev, amount: value }));
  };

  // Handle donation submission
  const handleDonate = async () => {
    if (user?.status !== "active") {
      return toast.error("Your account is not active. Please contact support.");
    }

    try {
      await axiosSecure.post("/api/donations", fundingInfo);
      toast.success("Donation Successful!");
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error donating funds:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Donate Funds
                </DialogTitle>

                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-500">User: {user?.email}</p>
                  <p className="text-sm text-gray-500">
                    Status: {user?.status}
                  </p>
                </div>

                {/* Donation Amount Input */}
                <div className="mt-4">
                  <label
                    htmlFor="donation-amount"
                    className="block text-sm text-gray-600"
                  >
                    Amount to Donate ($):
                  </label>
                  <input
                    type="number"
                    id="donation-amount"
                    value={donationAmount}
                    onChange={handleAmountChange}
                    min="1"
                    max="5"
                    className="mt-2 p-2 text-gray-800 border border-gray-300 rounded-md w-full"
                    placeholder="Enter amount (Max $5)"
                    required
                  />
                </div>

                {/* Donation Button */}
                <div className="mt-4">
                  <Menu>
                    <MenuButton
                      as={Button} // Using custom Button component
                      onClick={handleDonate}
                      label={`Donate $${donationAmount}`}
                    />
                  </Menu>
                </div>

                {/* Close Modal Button */}
                <div className="mt-3 text-center">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FundingModal;
