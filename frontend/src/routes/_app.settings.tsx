import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchCurrentUser, getDisplayName, getInitials, type CurrentUserClaims } from "@/lib/me";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings - Copilot" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState<CurrentUserClaims | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("dark", dark);
    el.classList.toggle("light", !dark);
  }, [dark]);

  useEffect(() => {
    let ignore = false;

    fetchCurrentUser()
      .then((nextUser) => {
        if (!ignore) {
          setUser(nextUser);
          setProfileError(null);
        }
      })
      .catch((error: Error) => {
        if (!ignore) {
          setProfileError(error.message);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const displayName = getDisplayName(user);
  const email = user?.email ?? "";

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account, workspace, and AI preferences.</p>
      </div>

      <Card className="bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>Your signed-in account from the API.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/15 text-primary">{getInitials(user)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{email || "No email claim returned"}</p>
            </div>
          </div>
          <Separator />
          {profileError ? <p className="text-sm text-destructive">{profileError}</p> : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input value={displayName} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Customize how Copilot looks on this device.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="Dark mode" hint="Use a darker color palette across the app.">
            <Switch checked={dark} onCheckedChange={setDark} />
          </Row>
          <Separator />
          <Row label="Reduced motion" hint="Minimize non-essential animations.">
            <Switch />
          </Row>
        </CardContent>
      </Card>

      <Card className="bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">AI preferences</CardTitle>
          <CardDescription>Tune how Copilot generates SQL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="Verification" hint="Run a static check on every generated query.">
            <Switch defaultChecked />
          </Row>
          <Separator />
          <Row label="Auto-execute" hint="Run queries automatically after verification passes.">
            <Switch defaultChecked />
          </Row>
          <Separator />
          <Row label="Save history" hint="Keep a searchable history of your queries.">
            <Switch defaultChecked />
          </Row>
        </CardContent>
      </Card>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger zone</CardTitle>
          <CardDescription>Irreversible workspace actions.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Delete this workspace and all its data.</p>
          <Button variant="destructive">Delete workspace</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}
