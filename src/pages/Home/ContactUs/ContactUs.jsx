import React from "react";
import { FaTint } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Blood Type Icon and Information */}
          <div className="flex flex-col items-center text-center md:text-left">
            <div className="text-red-600 text-[10rem] mb-6">
              <FaTint />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get in Touch with Us
            </h2>
            <p className="text-lg text-gray-600">
              Whether you have questions, need help, or want to know more about
              donating blood, we’re here for you.
            </p>
            <div className="mt-6">
              <p className="text-gray-700 font-semibold">Contact Number:</p>
              <p className="text-red-600 text-xl font-bold">
                +1 (800) 123-4567
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Contact Us
            </h3>
            <form>
              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
