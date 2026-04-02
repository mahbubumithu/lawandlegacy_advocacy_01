import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AdminEvents = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const [description, setDescription] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addEvent = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("events").insert({
        title,
        description: description || null,
        event_url: eventUrl || null,
        image_url: imageUrl || null,
        event_date: eventDate || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setTitle("");
      setDescription("");
      setEventUrl("");
      setImageUrl("");
      setEventDate("");
      toast({ title: "Event added successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to add event", variant: "destructive" });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Event deleted" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addEvent.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Event Manager</h1>
            <Link to="/news">
              <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10">
                View News Feed
              </Button>
            </Link>
          </div>

          {/* Add Event Form */}
          <Card className="mb-8 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Plus className="h-5 w-5" />
                Add New Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Event Title *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Event Link</label>
                    <Input
                      placeholder="https://..."
                      value={eventUrl}
                      onChange={(e) => setEventUrl(e.target.value)}
                      type="url"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Image URL</label>
                    <Input
                      placeholder="https://..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      type="url"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Event Date</label>
                  <Input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={addEvent.isPending} className="bg-gold text-navy hover:bg-gold/90">
                  {addEvent.isPending ? "Adding..." : "Add Event"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Events List */}
          <h2 className="text-xl font-semibold text-foreground mb-4">Existing Events</h2>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : events && events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event) => (
                <Card key={event.id} className="border-gold/10">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        {event.event_date && (
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        )}
                        {event.event_url && (
                          <a href={event.event_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gold hover:underline">
                            <LinkIcon className="h-3 w-3" /> Link
                          </a>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteEvent.mutate(event.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No events yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEvents;
