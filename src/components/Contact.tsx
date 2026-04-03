import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Contact = () => {
  const { data: content } = useSiteContent("contact");
  const offices = content?.offices || [];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content?.title || "Get In Touch"}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {content?.subtitle || "Reach out to us for legal consultation and advice."}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {offices.map((office: any, index: number) => (
              <Card key={index} className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gold" />
                    {office.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                  <p className="text-sm font-medium text-foreground">{office.city}</p>
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
                  <a href={`tel:${content?.phone || "+880 1716 32 8898"}`} className="text-foreground hover:text-gold transition-colors font-medium">
                    {content?.phone || "+880 1716 32 8898"}
                  </a>
                  <p className="text-muted-foreground text-sm">Available during office hours</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <a href={`mailto:${content?.email || "info@lawandlegacy.com.bd"}`} className="text-foreground hover:text-gold transition-colors font-medium">
                    {content?.email || "info@lawandlegacy.com.bd"}
                  </a>
                  <p className="text-muted-foreground text-sm">Send us your inquiry</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    {content?.office_hours || "Saturday - Thursday, 9:00 AM - 6:00 PM"}
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
