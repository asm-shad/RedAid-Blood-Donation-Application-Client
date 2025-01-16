import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Donors */}
          <div>
            <h3 className="text-xl font-bold mb-4">For Donors</h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Register:</strong> Sign up and create a profile.
              </li>
              <li>
                <strong>Schedule a Donation:</strong> Book a convenient time and
                location.
              </li>
              <li>
                <strong>Donate:</strong> Show up, donate, and save lives.
              </li>
            </ul>
          </div>
          {/* For Recipients */}
          <div>
            <h3 className="text-xl font-bold mb-4">For Recipients</h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Search for Donors:</strong> Use our platform to find a
                match.
              </li>
              <li>
                <strong>Contact Donors:</strong> Reach out and schedule a
                meeting.
              </li>
              <li>
                <strong>Receive Blood:</strong> Ensure a safe and successful
                transfusion.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
