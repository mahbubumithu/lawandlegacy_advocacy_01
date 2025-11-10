import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const offices = [
  {
    name: "Supreme Court Office",
    address: "Room No. 9049 (8th Floor), Huseyn Shaheed Suhrawardy Building, Supreme Court Bar Association",
    city: "Dhaka-1000",
    type: "Supreme Court",
  },
  {
    name: "Evening Office",
    address: "House No. 1/1 (B), (3rd Floor) Block-C, Lalmatia",
    city: "Dhaka-1207",
    type: "Evening",
  },
  {
    name: "Judge Court Office",
    address: "Room No. 746 (6th Floor), Dhaka Bar Association Building, 6-7, Court House Street, Kotwali",
    city: "Dhaka",
    type: "Judge Court",
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Reach out to us for legal consultation and advice. We're here to help you navigate your legal challenges.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {offices.map((office, index) => (
              <Card key={index} className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gold" />
                    {office.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {office.address}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {office.city}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-border shadow-[var(--shadow-elevated)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  {/* 📞 INSERT PHONE NUMBER HERE */}
                  <a href="tel:+8801711XXXXXXX" className="text-foreground hover:text-gold transition-colors font-medium">
                    +880 1716 32 8898
                  </a>
                  <p className="text-muted-foreground text-sm">
                    Available during office hours
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  {/* 📧 INSERT EMAIL ADDRESS HERE */}
                  <a href="mailto:contact@lawandlegacy.com" className="text-foreground hover:text-gold transition-colors font-medium">
                    info@lawandlegacy.com.bd
                  </a>
                  <p className="text-muted-foreground text-sm">
                    Send us your inquiry
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Saturday - Thursday<br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
              
              <div className="text-center pt-6">
                <Button size="lg" className="bg-primary hover:bg-navy-light">
                  Schedule a Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
