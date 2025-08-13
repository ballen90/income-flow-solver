import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const accounts = [
  { type: "Checking", name: "Everyday Checking", balance: 2840.23 },
  { type: "Savings", name: "High-Yield Savings", balance: 10540.88 },
  { type: "Credit Card", name: "Rewards Visa", balance: -1450.0 },
];

const Accounts = () => {
  return (
    <div className="space-y-6">
      <SEO
        title="Accounts – Finlytics"
        description="View and manage linked bank, credit, and investment accounts."
      />
      <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {accounts.map((acc) => (
          <Card key={acc.name} className="shadow-elevated">
            <CardHeader>
              <CardTitle>{acc.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{acc.name}</p>
              <p className="mt-2 text-xl font-semibold">${acc.balance.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        For live account linking, connect Supabase via Lovable and plug in your provider of choice later.
      </p>
    </div>
  );
};

export default Accounts;
