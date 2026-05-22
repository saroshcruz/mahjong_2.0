import Footer from "@/sections/Footer/Footer";
import Membership from "@/sections/Membership/Membership";
import Navbar from "@/sections/Navbar/Navbar";
import Trainers from "@/sections/Trainers/Trainers";
import ScrollToTop from "@/components/ScrollToTop";

function HeroPlaceholder() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-[#f5efe4]">
      <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[#c6a87a]/60">
        Hero — redesign in progress
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#f5efe4]">
      <Navbar />
      <HeroPlaceholder />
      <Trainers />
      <Membership />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
