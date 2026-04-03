import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Trash2, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    navigate("/admin/login");
  };

  const { data: allContent, isLoading } = useQuery({
    queryKey: ["site_content_all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section");
      if (error) throw error;
      const grouped: Record<string, Record<string, any>> = {};
      data?.forEach((row) => {
        if (!grouped[row.section]) grouped[row.section] = {};
        grouped[row.section][row.key] = row.value;
      });
      return grouped;
    },
  });

  const updateContent = useMutation({
    mutationFn: async ({ section, key, value }: { section: string; key: string; value: any }) => {
      const { error } = await supabase
        .from("site_content")
        .update({ value })
        .eq("section", section)
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content_all"] });
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast({ title: "Content updated!" });
    },
    onError: () => {
      toast({ title: "Failed to update", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 text-center text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <div className="flex gap-2">
              <Link to="/admin/events">
                <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10">
                  Event Manager
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-destructive/30 text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="practice_areas">Practice</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <HeroEditor content={allContent?.hero || {}} onSave={updateContent.mutate} />
            </TabsContent>
            <TabsContent value="about">
              <AboutEditor content={allContent?.about || {}} onSave={updateContent.mutate} />
            </TabsContent>
            <TabsContent value="practice_areas">
              <PracticeAreasEditor content={allContent?.practice_areas || {}} onSave={updateContent.mutate} />
            </TabsContent>
            <TabsContent value="team">
              <TeamEditor content={allContent?.team || {}} onSave={updateContent.mutate} />
            </TabsContent>
            <TabsContent value="clients">
              <ClientsEditor content={allContent?.clients || {}} onSave={updateContent.mutate} />
            </TabsContent>
            <TabsContent value="contact">
              <ContactEditor content={allContent?.contact || {}} onSave={updateContent.mutate} />
            </TabsContent>
            <TabsContent value="footer">
              <FooterEditor content={allContent?.footer || {}} onSave={updateContent.mutate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- Section Editors ---

type SaveFn = (args: { section: string; key: string; value: any }) => void;

function HeroEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [title, setTitle] = useState(content.title || "");
  const [subtitle, setSubtitle] = useState(content.subtitle || "");
  const [description, setDescription] = useState(content.description || "");
  const [buttonText, setButtonText] = useState(content.button_text || "");

  useEffect(() => {
    setTitle(content.title || "");
    setSubtitle(content.subtitle || "");
    setDescription(content.description || "");
    setButtonText(content.button_text || "");
  }, [content]);

  const save = () => {
    onSave({ section: "hero", key: "title", value: title });
    onSave({ section: "hero", key: "subtitle", value: subtitle });
    onSave({ section: "hero", key: "description", value: description });
    onSave({ section: "hero", key: "button_text", value: buttonText });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Subtitle</label>
          <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Button Text</label>
          <Input value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
        </div>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function AboutEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [title, setTitle] = useState(content.title || "");
  const [p1, setP1] = useState(content.paragraph1 || "");
  const [p2, setP2] = useState(content.paragraph2 || "");
  const [quote, setQuote] = useState(content.quote || "");
  const [highlights, setHighlights] = useState<string[]>(content.highlights || []);

  useEffect(() => {
    setTitle(content.title || "");
    setP1(content.paragraph1 || "");
    setP2(content.paragraph2 || "");
    setQuote(content.quote || "");
    setHighlights(content.highlights || []);
  }, [content]);

  const save = () => {
    onSave({ section: "about", key: "title", value: title });
    onSave({ section: "about", key: "paragraph1", value: p1 });
    onSave({ section: "about", key: "paragraph2", value: p2 });
    onSave({ section: "about", key: "quote", value: quote });
    onSave({ section: "about", key: "highlights", value: highlights });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Paragraph 1</label>
          <Textarea value={p1} onChange={(e) => setP1(e.target.value)} rows={4} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Paragraph 2</label>
          <Textarea value={p2} onChange={(e) => setP2(e.target.value)} rows={4} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Quote</label>
          <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={2} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Highlights</label>
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input value={h} onChange={(e) => { const n = [...highlights]; n[i] = e.target.value; setHighlights(n); }} />
              <Button variant="ghost" size="icon" onClick={() => setHighlights(highlights.filter((_, j) => j !== i))} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setHighlights([...highlights, ""])} className="mt-1">
            <Plus className="h-4 w-4 mr-1" /> Add Highlight
          </Button>
        </div>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function PracticeAreasEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [title, setTitle] = useState(content.title || "");
  const [subtitle, setSubtitle] = useState(content.subtitle || "");
  const [areas, setAreas] = useState<{ icon: string; title: string; description: string }[]>(content.areas || []);

  useEffect(() => {
    setTitle(content.title || "");
    setSubtitle(content.subtitle || "");
    setAreas(content.areas || []);
  }, [content]);

  const updateArea = (index: number, field: string, value: string) => {
    const n = [...areas];
    n[index] = { ...n[index], [field]: value };
    setAreas(n);
  };

  const save = () => {
    onSave({ section: "practice_areas", key: "title", value: title });
    onSave({ section: "practice_areas", key: "subtitle", value: subtitle });
    onSave({ section: "practice_areas", key: "areas", value: areas });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>Practice Areas</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Section Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Subtitle</label>
          <Textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={2} />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground block">Practice Areas</label>
          {areas.map((area, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Area #{i + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => setAreas(areas.filter((_, j) => j !== i))} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Title" value={area.title} onChange={(e) => updateArea(i, "title", e.target.value)} />
              <Textarea placeholder="Description" value={area.description} onChange={(e) => updateArea(i, "description", e.target.value)} rows={2} />
              <Input placeholder="Icon name (e.g. Gavel, Scale)" value={area.icon} onChange={(e) => updateArea(i, "icon", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setAreas([...areas, { icon: "Scale", title: "", description: "" }])}>
            <Plus className="h-4 w-4 mr-1" /> Add Practice Area
          </Button>
        </div>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function TeamEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [title, setTitle] = useState(content.title || "");
  const [subtitle, setSubtitle] = useState(content.subtitle || "");
  const [members, setMembers] = useState<any[]>(content.members || []);

  useEffect(() => {
    setTitle(content.title || "");
    setSubtitle(content.subtitle || "");
    setMembers(content.members || []);
  }, [content]);

  const updateMember = (index: number, field: string, value: string) => {
    const n = [...members];
    n[index] = { ...n[index], [field]: value };
    setMembers(n);
  };

  const save = () => {
    onSave({ section: "team", key: "title", value: title });
    onSave({ section: "team", key: "subtitle", value: subtitle });
    onSave({ section: "team", key: "members", value: members });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Section Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Subtitle</label>
          <Textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={2} />
        </div>
        <div className="space-y-4">
          {members.map((m, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{m.name || `Member #${i + 1}`}</span>
                <Button variant="ghost" size="icon" onClick={() => setMembers(members.filter((_, j) => j !== i))} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Name" value={m.name || ""} onChange={(e) => updateMember(i, "name", e.target.value)} />
              <Input placeholder="Role" value={m.role || ""} onChange={(e) => updateMember(i, "role", e.target.value)} />
              <Input placeholder="Credentials" value={m.credentials || ""} onChange={(e) => updateMember(i, "credentials", e.target.value)} />
              <Input placeholder="Education" value={m.education || ""} onChange={(e) => updateMember(i, "education", e.target.value)} />
              <Input placeholder="Experience" value={m.experience || ""} onChange={(e) => updateMember(i, "experience", e.target.value)} />
              <Input placeholder="Specialization" value={m.specialization || ""} onChange={(e) => updateMember(i, "specialization", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setMembers([...members, { name: "", role: "", credentials: "", education: "", specialization: "" }])}>
            <Plus className="h-4 w-4 mr-1" /> Add Team Member
          </Button>
        </div>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function ClientsEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [title, setTitle] = useState(content.title || "");
  const [subtitle, setSubtitle] = useState(content.subtitle || "");
  const [categories, setCategories] = useState<any[]>(content.categories || []);

  useEffect(() => {
    setTitle(content.title || "");
    setSubtitle(content.subtitle || "");
    setCategories(content.categories || []);
  }, [content]);

  const updateCategory = (index: number, field: string, value: any) => {
    const n = [...categories];
    n[index] = { ...n[index], [field]: value };
    setCategories(n);
  };

  const save = () => {
    onSave({ section: "clients", key: "title", value: title });
    onSave({ section: "clients", key: "subtitle", value: subtitle });
    onSave({ section: "clients", key: "categories", value: categories });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>Clients</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Section Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Subtitle</label>
          <Textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={2} />
        </div>
        {categories.map((cat, i) => (
          <div key={i} className="border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{cat.title || `Category #${i + 1}`}</span>
              <Button variant="ghost" size="icon" onClick={() => setCategories(categories.filter((_, j) => j !== i))} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Input placeholder="Category Title" value={cat.title || ""} onChange={(e) => updateCategory(i, "title", e.target.value)} />
            <Input placeholder="Icon (e.g. Landmark, Building2)" value={cat.icon || ""} onChange={(e) => updateCategory(i, "icon", e.target.value)} />
            <div>
              <label className="text-xs text-muted-foreground">Clients (one per line)</label>
              <Textarea
                value={(cat.clients || []).join("\n")}
                onChange={(e) => updateCategory(i, "clients", e.target.value.split("\n"))}
                rows={4}
              />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setCategories([...categories, { icon: "Building2", title: "", clients: [] }])}>
          <Plus className="h-4 w-4 mr-1" /> Add Category
        </Button>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function ContactEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [title, setTitle] = useState(content.title || "");
  const [subtitle, setSubtitle] = useState(content.subtitle || "");
  const [phone, setPhone] = useState(content.phone || "");
  const [email, setEmail] = useState(content.email || "");
  const [officeHours, setOfficeHours] = useState(content.office_hours || "");
  const [offices, setOffices] = useState<any[]>(content.offices || []);

  useEffect(() => {
    setTitle(content.title || "");
    setSubtitle(content.subtitle || "");
    setPhone(content.phone || "");
    setEmail(content.email || "");
    setOfficeHours(content.office_hours || "");
    setOffices(content.offices || []);
  }, [content]);

  const updateOffice = (index: number, field: string, value: string) => {
    const n = [...offices];
    n[index] = { ...n[index], [field]: value };
    setOffices(n);
  };

  const save = () => {
    onSave({ section: "contact", key: "title", value: title });
    onSave({ section: "contact", key: "subtitle", value: subtitle });
    onSave({ section: "contact", key: "phone", value: phone });
    onSave({ section: "contact", key: "email", value: email });
    onSave({ section: "contact", key: "office_hours", value: officeHours });
    onSave({ section: "contact", key: "offices", value: offices });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Section Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Subtitle</label>
          <Textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={2} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Office Hours</label>
          <Input value={officeHours} onChange={(e) => setOfficeHours(e.target.value)} />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground block">Offices</label>
          {offices.map((office, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{office.name || `Office #${i + 1}`}</span>
                <Button variant="ghost" size="icon" onClick={() => setOffices(offices.filter((_, j) => j !== i))} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Name" value={office.name || ""} onChange={(e) => updateOffice(i, "name", e.target.value)} />
              <Textarea placeholder="Address" value={office.address || ""} onChange={(e) => updateOffice(i, "address", e.target.value)} rows={2} />
              <Input placeholder="City" value={office.city || ""} onChange={(e) => updateOffice(i, "city", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setOffices([...offices, { name: "", address: "", city: "" }])}>
            <Plus className="h-4 w-4 mr-1" /> Add Office
          </Button>
        </div>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function FooterEditor({ content, onSave }: { content: Record<string, any>; onSave: SaveFn }) {
  const [description, setDescription] = useState(content.description || "");

  useEffect(() => {
    setDescription(content.description || "");
  }, [content]);

  const save = () => {
    onSave({ section: "footer", key: "description", value: description });
  };

  return (
    <Card className="border-gold/20">
      <CardHeader><CardTitle>Footer</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>
        <Button onClick={save} className="bg-gold text-navy hover:bg-gold/90">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

export default AdminDashboard;
