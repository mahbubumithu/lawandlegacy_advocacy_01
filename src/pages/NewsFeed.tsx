import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const NewsFeed = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              News & Events
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay updated with our latest events, seminars, and legal news.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading events...</div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-gold/20">
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{event.title}</CardTitle>
                    {event.event_date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(event.event_date).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {event.description && (
                      <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    )}
                    {event.event_url && (
                      <a
                        href={event.event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-2 border-gold/30 text-gold hover:bg-gold/10">
                          <ExternalLink className="h-4 w-4" />
                          View Details
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              No events posted yet. Check back soon!
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/">
              <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsFeed;
