import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieBackground = ({ animationData, className = "", style = {} }) => {
  const lottieContainer = useRef(null);

  useEffect(() => {
    const lottieInstance = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData, // Animation data passed as a prop
    });

    return () => {
      lottieInstance.destroy(); // Cleanup on unmount
    };
  }, [animationData]);

  return (
    <div
      ref={lottieContainer}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none", ...style }} // Spread custom styles
    ></div>
  );
};

export default LottieBackground;
