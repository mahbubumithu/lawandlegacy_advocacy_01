import { Building2, Landmark, Shield, Briefcase } from "lucide-react";

const clientCategories = [
  {
    icon: Landmark,
    title: "Government Entities",
    clients: [
      "Bangladesh Hi-Tech Park Authority",
      "Ministry of Commerce",
      "Ministry of Expatriates' Welfare & Overseas Employment",
      "Bangladesh Fisheries Development Corporation",
      "Export Promotion Bureau (EPB)",
      "Directorate of Government Accommodation",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Clients",
    clients: [
      "Ashiyan Group",
      "Arizona Holding Ltd.",
      "Alif Group",
      "Planet Group",
      "Studio Dhaka Limited",
      "ESSDEE Infrastructure Ltd.",
    ],
  },
  {
    icon: Shield,
    title: "Financial Institutions",
    clients: [
      "Leading Banks of Bangladesh",
      "Non-Banking Financial Institutions",
      "Capital Market Participants",
      "Insurance Companies",
    ],
  },
  {
    icon: Briefcase,
    title: "Industry Partners",
    clients: [
      "Fakir Fashions Ltd",
      "Transport Partner Ltd.",
      "Banglalink Employees Union",
      "BA3 Limited",
    ],
  },
];

export const Clients = () => {
  return (
    <section id="clients" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Clients
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by government ministries, multinational corporations, banks, and leading businesses across Bangladesh
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {clientCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg p-8 hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {category.clients.map((client, clientIndex) => (
                    <li 
                      key={clientIndex}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="text-gold mt-1.5">•</span>
                      <span>{client}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
