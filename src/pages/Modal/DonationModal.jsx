import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Button from "../../components/Button/Button";

const DonationModal = ({ closeModal, isOpen, requestDetails, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { _id, status } = requestDetails;

  const handleConfirmDonation = async () => {
    try {
      await axiosSecure.patch(`/donation-requests/${_id}`, {
        status: "inprogress",
      });
      toast.success("Donation confirmed! Status updated to in progress.");
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm the donation. Please try again.");
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
                  Confirm Your Donation
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    Donor Name: <strong>{user?.displayName}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Donor Email: <strong>{user?.email}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Blood Group: <strong>{requestDetails.bloodGroup}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Recipient: <strong>{requestDetails.recipientName}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Hospital: <strong>{requestDetails.hospitalName}</strong>
                  </p>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <Button onClick={closeModal} label="Cancel" gradient />
                  <Button
                    onClick={handleConfirmDonation}
                    label="Confirm Donation"
                    gradient
                    disabled={status !== "pending"}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DonationModal;
