import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";

function Home() {
  return (
    <div className="bg-slate-900 text-white">
      <Navbar/>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <Stats />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
