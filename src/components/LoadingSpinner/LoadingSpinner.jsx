import React from "react";
import { Circles } from "react-loader-spinner"; // Import the Hairball spinner
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
      <Circles
        height={100} // Adjust height
        width={100} // Adjust width
        colors={{
          fillColor1: "#ff0000", // Red
          fillColor2: "#00ff00", // Green
          fillColor3: "#0000ff", // Blue
          fillColor4: "#ffff00", // Yellow
        }}
        visible={true} // Display the spinner
      />
    </div>
  );
};

export default LoadingSpinner;
