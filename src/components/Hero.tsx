import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[image:var(--gradient-hero)]">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gold/10 p-4 rounded-full border-2 border-gold">
              <Scale className="w-20 h-20 text-gold" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Law & Legacy
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-light">
            Premier Advocacy Firm in Bangladesh
          </p>
          
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            A new-generation law firm providing comprehensive legal solutions from documentation to litigation, 
            serving individuals, corporations, and government entities with excellence and integrity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection("contact")}
              className="text-base font-medium"
            >
              Get Legal Consultation
            </Button>

          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
