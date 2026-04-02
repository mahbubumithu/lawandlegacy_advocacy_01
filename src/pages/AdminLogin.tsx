import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("verify-admin", {
        body: { password },
      });

      if (error || !data?.success) {
        toast({ title: "Invalid password", variant: "destructive" });
      } else {
        sessionStorage.setItem("admin_authenticated", "true");
        navigate("/admin/events");
      }
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md border-gold/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-gold" />
            </div>
            <CardTitle className="text-foreground">Admin Access</CardTitle>
            <p className="text-sm text-muted-foreground">Enter the admin password to manage events</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading} className="w-full bg-gold text-navy hover:bg-gold/90">
                {loading ? "Verifying..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
