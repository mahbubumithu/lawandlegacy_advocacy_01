import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Scale, 
  Building2, 
  Briefcase, 
  Users, 
  Shield, 
  Home,
  Gavel,
  FileText,
  Landmark,
  Globe,
  TrendingUp,
  Award
} from "lucide-react";

const practiceAreas = [
  {
    icon: Gavel,
    title: "Civil & Criminal Litigation",
    description: "Representing clients before all courts of Bangladesh from Judges Court to Appellate Division with meticulous case preparation.",
  },
  {
    icon: Building2,
    title: "Banking & Finance",
    description: "Expert scrutiny of documents, property title determination, and drafting security documents for banks and NBFIs.",
  },
  {
    icon: Briefcase,
    title: "Company & Corporate Law",
    description: "Comprehensive services from incorporation to mergers and acquisitions, serving as retainer lawyers for major corporations.",
  },
  {
    icon: FileText,
    title: "Documentation & Registration",
    description: "Meticulous scrutiny of title deeds, verification with government authorities, and expert assistance in document registration.",
  },
  {
    icon: Users,
    title: "Labour & Employment",
    description: "Cost-effective representation in labour courts and tribunals, with thousands of BLA cases successfully litigated.",
  },
  {
    icon: Award,
    title: "Intellectual Property",
    description: "Full range of IP services including copyright, trademark, patent, and industrial design protection.",
  },
  {
    icon: Home,
    title: "Family Law",
    description: "Professional and confidential handling of divorce, maintenance, custody, and other family matters under various laws.",
  },
  {
    icon: Shield,
    title: "Constitutional & Administrative",
    description: "Expert representation in constitutional matters and administrative law before High Court and Appellate Division.",
  },
  {
    icon: Globe,
    title: "International Trade",
    description: "Comprehensive support for foreign investment, joint ventures, and international business transactions.",
  },
  {
    icon: Scale,
    title: "Alternative Dispute Resolution",
    description: "Skilled in domestic and international arbitration, mediation, conciliation, and negotiation processes.",
  },
  {
    icon: TrendingUp,
    title: "Capital Market",
    description: "Securities law, stock exchange regulation, and comprehensive capital market advisory services.",
  },
  {
    icon: Landmark,
    title: "Land & Property Law",
    description: "Expert handling of land disputes, property transactions, leases, and licensing matters.",
  },
];

export const PracticeAreas = () => {
  return (
    <section id="practice-areas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Areas of Practice
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive legal services across diverse practice areas, meeting virtually every need of our clients
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {practiceAreas.map((area, index) => {
            const Icon = area.icon;
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
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
