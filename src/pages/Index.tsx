import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PracticeAreas } from "@/components/PracticeAreas";
import { Team } from "@/components/Team";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <PracticeAreas />
      <Team />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
