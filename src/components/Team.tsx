import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Team = () => {
  const { data: content } = useSiteContent("team");
  const members = content?.members || [];

  return (
    <section id="team" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content?.title || "Our Legal Team"}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {content?.subtitle || "Experienced legal professionals committed to providing the highest standards of advocacy and advice"}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {members.map((member: any, index: number) => (
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
