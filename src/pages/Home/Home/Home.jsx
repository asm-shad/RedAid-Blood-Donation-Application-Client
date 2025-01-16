import React from "react";
import Banner from "../Banner/Banner";
import Features from "../FeaturedSection/Features";
import ContactUs from "../ContactUs/ContactUs";
import HowItWorks from "../HowItWorks/HowItWorks";
import FAQ from "../FAQ/FAQ";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <ContactUs></ContactUs>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
