import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { loginWithGithub } from "@/services/supabase_auth";
import { Sparkles, Github } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — AI Database Copilot" },
      { name: "description", content: "Sign in or create an account to chat with your databases." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await login(signinForm.email, signinForm.password);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Signed in successfully");
      navigate({ to: "/dashboard" });
    } finally {
      setLoading(false);
    }
  };

  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signup(signupForm.email, signupForm.password, signupForm.name);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully");
      navigate({ to: "/dashboard" });
    } finally {
      setLoading(false);
    }
  };

  const submitGithub = async () => {
    setLoading(true);

    try {
      const { error } = await loginWithGithub();

      if (error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border bg-sidebar lg:block">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Copilot</span>
          </Link>
          <blockquote className="space-y-3 text-sm">
            <p className="text-balance text-lg leading-relaxed text-foreground/90">
              "We replaced three internal BI tools with Copilot. Our analysts ship answers in minutes, not hours."
            </p>
            <footer className="text-muted-foreground">Priya Shah · Head of Data, Northwind</footer>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your workspace to continue.</p>
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-5">
              <form onSubmit={submitSignin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={signinForm.email}
                    onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a className="text-xs text-muted-foreground hover:text-foreground" href="#">Forgot?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={signinForm.password}
                    onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-5">
              <form onSubmit={submitSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    placeholder="Alex Morgan"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email2">Work email</Label>
                  <Input
                    id="email2"
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">Password</Label>
                  <Input
                    id="password2"
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
          </div>

          <Button variant="outline" className="w-full" disabled={loading} onClick={submitGithub}>
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
