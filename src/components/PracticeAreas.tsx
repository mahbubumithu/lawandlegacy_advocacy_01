import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Scale, Building2, Briefcase, Users, Shield, Home,
  Gavel, FileText, Landmark, Globe, TrendingUp, Award,
  type LucideIcon
} from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const iconMap: Record<string, LucideIcon> = {
  Scale, Building2, Briefcase, Users, Shield, Home,
  Gavel, FileText, Landmark, Globe, TrendingUp, Award,
};

const defaultAreas = [
  { icon: "Gavel", title: "Civil & Criminal Litigation", description: "Representing clients before all courts of Bangladesh." },
  { icon: "Building2", title: "Banking & Finance", description: "Expert scrutiny of documents for banks and NBFIs." },
];

export const PracticeAreas = () => {
  const { data: content } = useSiteContent("practice_areas");
  const areas = content?.areas || defaultAreas;

  return (
    <section id="practice-areas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content?.title || "Areas of Practice"}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {content?.subtitle || "Comprehensive legal services across diverse practice areas"}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {areas.map((area: any, index: number) => {
            const Icon = iconMap[area.icon] || Scale;
            return (
              <Card 
                key={index} 
                className="border-border hover:border-gold transition-all duration-300 hover:shadow-[var(--shadow-card)] group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
