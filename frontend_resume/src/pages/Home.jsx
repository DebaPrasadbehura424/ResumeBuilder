import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import PricingSection from "../components/PricingSection";
import TemplatePreview from "../components/TemplatePreview";
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";


export default function Home() {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <div className="font-poppins">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <TemplatePreview />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
