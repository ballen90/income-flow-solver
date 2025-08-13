import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6">
      <SEO
        title="Settings – Finlytics"
        description="Configure integrations, preferences, and data sources."
      />
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>Connect your backend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            To enable authentication, secure storage, and real bank account connections, connect your Lovable project to Supabase using the green button in the top-right of the editor.
          </p>
          <p>
            Once connected, we can add sign-up/login, persist accounts and transactions, and integrate a provider for bank linking.
          </p>
          <p>
            Learn more in the docs: <a className="underline" href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noreferrer">Supabase integration</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
