import { Scale } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Updated logo size to w-8 h-8 */}
              <div className="w-30 h-30 flex items-center justify-center p-0">
                <img 
                  src="/logo.png" 
                  alt="Law & Legacy Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold"></h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              A pre-eminent law firm providing comprehensive legal services across Bangladesh. 
              We pride ourselves on our commitment to personal service and delivering the very best results for our clients.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#practice-areas" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  Practice Areas
                </a>
              </li>
              <li>
                <a href="#team" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gold">Practice Areas</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>Civil & Criminal Litigation</li>
              <li>Banking & Finance</li>
              <li>Corporate Law</li>
              <li>Labour & Employment</li>
              <li>Intellectual Property</li>
              <li>Family Law</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="text-center text-primary-foreground/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Law & Legacy. All rights reserved.</p>
            <p className="mt-2">
              Designed By | <a href="https://www.linkedin.com/in/mahbubumithu/" className="hover:text-gold transition-colors">Mahbub Mithu</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
