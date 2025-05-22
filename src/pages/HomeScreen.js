import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";


const HomeScreen = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default HomeScreen;
