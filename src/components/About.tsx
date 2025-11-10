import { CheckCircle2 } from "lucide-react";

export const About = () => {
  const highlights = [
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
              About Law & Legacy
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>
          
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Law & Legacy is a pre-eminent law firm providing specialist advice and a full range of legal services. 
              As one of the most promising, growing, and multidimensional law firms in Bangladesh, we offer comprehensive 
              legal services meeting virtually every need of our clients.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our practice is predominantly litigation-based, providing comprehensive advice to clients ranging from 
              individuals and small businesses to large privately held national and international corporations, banks, 
              and governmental entities.
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
                "We depend on our legal mind and prudence rather than traditional understanding. 
                Our audacity of honesty and sincerity has instituted us as a successful growing law firm."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
