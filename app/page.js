import Navbar from "@/landing-page/Navbar";
import HeroSection from "@/landing-page/HeroSection";
import About from "@/landing-page/About";
import Features from "@/landing-page/Features";
import HistorySection from "@/landing-page/History";
import QuoteSection from "@/landing-page/QuoteSection";
import Footer01 from "@/landing-page/footer/Footer01";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Features />
      <HistorySection />
      <QuoteSection />
      <Footer01 />
    </>
  );
}