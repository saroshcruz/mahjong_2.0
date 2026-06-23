import Footer from "@/sections/Footer/Footer";
import Events from "@/sections/Events/Events";
import FAQ from "@/sections/FAQ/FAQ";
import Hero from "@/sections/Hero/Hero";
import Membership from "@/sections/Membership/Membership";
import Navbar from "@/sections/Navbar/Navbar";
import OurStory from "@/sections/OurStory/OurStory";
import Trainers from "@/sections/Trainers/Trainers";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#f5efe4]">
      <Navbar />
      <Hero />
      <OurStory />
      <Membership />
      <Trainers />
      <Events />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
