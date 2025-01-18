import React from "react";
import { CirclesWithBar } from "react-loader-spinner"; // Import the CirclesWithBar spinner
import bgLoader from "../../assets/cork-board.jpg"; // Background image

const LoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${bgLoader})`, // Correct background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CirclesWithBar
        height="100" // Spinner height
        width="100" // Spinner width
        color="#4fa94d" // Main color
        outerCircleColor="#4fa94d" // Outer circle color
        innerCircleColor="#4fa94d" // Inner circle color
        barColor="#4fa94d" // Bar color
        ariaLabel="circles-with-bar-loading" // Accessibility label
        wrapperStyle={{}} // Additional inline styles
        wrapperClass="" // Additional wrapper classes
        visible={true} // Display the spinner
      />
    </div>
  );
};

export default LoadingSpinner;
