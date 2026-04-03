import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export const About = () => {
  const { data: content } = useSiteContent("about");

  const highlights: string[] = content?.highlights || [
    "Top-tier legal professionals from leading law schools",
    "Comprehensive one-stop legal service centre",
    "Enlisted with numerous companies and banks",
    "Proven track record with government ministries",
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {content?.title || "About Law & Legacy"}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>
          
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content?.paragraph1 || "Law & Legacy is a pre-eminent law firm providing specialist advice and a full range of legal services."}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content?.paragraph2 || "Our practice is predominantly litigation-based, providing comprehensive advice to clients."}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <p className="text-foreground font-medium">{highlight}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-primary/5 border-l-4 border-gold p-6 mt-8 rounded-r-lg">
              <p className="text-lg text-foreground italic">
                "{content?.quote || "We depend on our legal mind and prudence rather than traditional understanding."}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
