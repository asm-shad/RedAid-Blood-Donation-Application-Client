import React from "react";
import { FaClock, FaHeart, FaShieldAlt, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <>
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <p className="text-gray-600 mb-12">
            Discover the benefits of joining our blood donation community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-red-600 text-4xl mb-4 flex justify-center items-center">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast and Easy</h3>
              <p className="text-gray-600">
                Sign up in minutes and connect with donors or searchers
                instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-red-600 text-4xl mb-4 flex justify-center items-center">
                <FaHeart />
              </div>
              <h3 className="text-xl font-bold mb-2">Save Lives</h3>
              <p className="text-gray-600">
                Every donation can save up to three lives. Be a hero today.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-red-600 text-4xl mb-4 flex justify-center items-center">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your personal data is secure and protected with us.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-red-600 text-4xl mb-4 flex justify-center items-center">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Access</h3>
              <p className="text-gray-600">
                Find blood donors or make donations anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-red-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-lg mb-6">
            Join our community of donors and make a difference today!
          </p>
          <Link
            to="/donation-requests"
            className="btn bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Become a Donor Now
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Donors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">
                "Donating blood was the most rewarding experience of my life.
                Knowing I saved lives is priceless."
              </p>
              <h4 className="mt-4 font-bold">- Sarah, Donor</h4>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">
                "This platform made it so easy to find a donor when my father
                needed a transfusion. Thank you!"
              </p>
              <h4 className="mt-4 font-bold">- James, Recipient</h4>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">
                "I'm proud to be part of this community. It's amazing to see how
                quickly we can make a difference."
              </p>
              <h4 className="mt-4 font-bold">- Emily, Donor</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Statistic 1 */}
            <div className="text-red-600 text-5xl font-bold">10,000+</div>
            <p className="text-gray-600">Donations Collected</p>

            {/* Statistic 2 */}
            <div className="text-red-600 text-5xl font-bold">25,000+</div>
            <p className="text-gray-600">Lives Saved</p>

            {/* Statistic 3 */}
            <div className="text-red-600 text-5xl font-bold">5,000+</div>
            <p className="text-gray-600">Registered Donors</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
