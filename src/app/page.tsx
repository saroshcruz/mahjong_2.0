import Footer from "@/sections/Footer/Footer";
import Events from "@/sections/Events/Events";
import Hero from "@/sections/Hero/Hero";
import Membership from "@/sections/Membership/Membership";
import Navbar from "@/sections/Navbar/Navbar";
import OurStory from "@/sections/OurStory/OurStory";
import Trainers from "@/sections/Trainers/Trainers";
import ScrollToTop from "@/components/ScrollToTop";
import { isStagingPaymentTestEnabled } from "@/lib/membership/tiers";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#f5efe4]">
      <Navbar />
      <Hero />
      <OurStory />
      <Membership showStagingTestTier={isStagingPaymentTestEnabled()} />
      <Trainers />
      <Events />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
