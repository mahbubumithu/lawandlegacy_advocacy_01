import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    name: "Porob Naser Siddique",
    role: "Head of Chamber",
    credentials: "Advocate, Supreme Court of Bangladesh",
    education: "LLM & LLB, University of Dhaka",
    specialization: "Corporate Law, Banking, International Trade, Mergers & Acquisitions",
  },
  {
    name: "George Chowdhury",
    role: "Managing Partner",
    credentials: "Advocate, Supreme Court of Bangladesh",
    experience: "17+ years in litigation and corporate advisory",
    specialization: "Civil, Criminal, Constitutional, High-Stakes Litigation",
  },
    {
    name: "Neshatul Islam",
    role: "Associate",
    credentials: "Advocate",
    education: "LL.B (Hon's) & LL.M, Dhaka International University",
    specialization: "Corporate Law, Securities, Company Formation, Intellectual Property",
  },
  {
    name: "Nazibul Islam",
    role: "Associate",
    credentials: "Advocate, Supreme Court of Bangladesh",
    education: "LL.M. & LL.B. (Hon's), Jagannath University",
    specialization: "Civil & Criminal Law, Constitutional Matters, Labour Law",
  },

  {
    name: "Samir Chakrabarty",
    role: "Associate",
    credentials: "Advocate, Sessions Court Dhaka",
    specialization: "Land Law, Contract Disputes, Family Law, Criminal Defense",
  },
  {
    name: "Aktaruzzaman Aktar",
    role: "Associate",
    education: "LL.B & LL.M, East West University",
    experience: "5+ years with national and multinational corporations",
    specialization: "Corporate Law, Regulatory Compliance, Consumer Rights",
  },
  {
    name: "Pampa Mukherjee",
    role: "Junior Associate",
    credentials: "Advocate, District & Sessions Court Dhaka",
    education: "LL.B. (Hon's) & LL.M., Northern University Bangladesh",
    specialization: "Property Disputes, Family Law, General Litigation",
  },
  {
    name: "Md. Rayhanul Islam",
    role: "Junior Associate",
    credentials: "Advocate, District & Sessions Court Dhaka",
    education: "LL.B. (Hon's) & LL.M., Eastern University",
    specialization: "Property Law, Family Disputes, General Litigation",
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Legal Team
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experienced legal professionals committed to providing the highest standards of advocacy and advice
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="bg-gold/10 text-gold hover:bg-gold/20 border-gold/20">
                    {member.role}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {member.credentials && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Credentials:</span> {member.credentials}
                  </p>
                )}
                {member.education && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Education:</span> {member.education}
                  </p>
                )}
                {member.experience && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Experience:</span> {member.experience}
                  </p>
                )}
                {member.specialization && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Focus Areas:</span> {member.specialization}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
