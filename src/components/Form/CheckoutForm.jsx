/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const CheckoutForm = ({ closeModal, refetch, donationAmount, fundingInfo }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (donationAmount > 0) {
      getPaymentIntent();
    }
  }, [donationAmount]);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-donate-intent", {
        amount: donationAmount,
      });
      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        console.error("No client secret received");
      }
    } catch (err) {
      console.error("Error creating payment intent:", err);
      toast.error("Failed to create payment intent");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      toast.error("Card details not provided");
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("Payment method error:", error);
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: fundingInfo?.name || "Anonymous",
              email: fundingInfo?.email || "noemail@example.com",
            },
          },
        });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        toast.error("Payment failed. Please try again.");
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await axiosSecure.post("/fund", {
          ...fundingInfo,
          transactionId: paymentIntent.id,
        });

        toast.success("Donation Successful!");
        refetch();
        closeModal();
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-around mt-2 gap-2">
        <Button
          disabled={!stripe || !clientSecret || processing}
          type="submit"
          label={`Pay $${donationAmount}`}
        />
        <Button outline={true} onClick={closeModal} label="Cancel" />
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fundingInfo: PropTypes.object,
  refetch: PropTypes.func.isRequired,
  donationAmount: PropTypes.number.isRequired,
};

export default CheckoutForm;
