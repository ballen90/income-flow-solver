import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpendingChart from "@/components/charts/SpendingChart";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, PiggyBank } from "lucide-react";
import { toast } from "sonner";

const mock = {
  incomeMonthly: 6200,
  spendingMonthly: 4180,
  savingsRate: 18.6,
  accounts: [
    { name: "Checking", balance: 2840.23 },
    { name: "Savings", balance: 10540.88 },
    { name: "Credit Card", balance: -1450.0 },
  ],
};

const Index = () => {
  const totalBalance = mock.accounts.reduce((sum, a) => sum + a.balance, 0);

  const onConnect = () =>
    toast("Connect Supabase in Lovable to enable real account linking and sync.");

  return (
    <div className="space-y-8">
      <SEO
        title="Finlytics – Finance Dashboard: Spending & Debt Insights"
        description="All-in-one personal finance dashboard with account integration, spending analysis, and debt payoff optimization."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Finlytics',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        }}
      />

      <section className="rounded-xl bg-hero p-6 shadow-glow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Financial clarity, automated
            </h1>
            <p className="mt-2 text-muted-foreground max-w-prose">
              Link accounts, analyze spending patterns, and accelerate your debt payoff with data-driven recommendations.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="hero" onClick={onConnect}>
              <Wallet className="mr-2" /> Connect accounts
            </Button>
            <Button variant="outline" asChild>
              <Link to="/accounts">
                <PiggyBank className="mr-2" /> Add manual account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Total balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Monthly income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${mock.incomeMonthly.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Savings rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{mock.savingsRate}%</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-elevated">
          <CardHeader>
            <CardTitle>Spending overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingChart />
          </CardContent>
        </Card>
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Quick win</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You spent $312 more on Dining this month vs your 3-month average.
            </p>
            <Button size="sm" asChild>
              <Link to="/spending">
                <TrendingUp className="mr-2" /> See category insights
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
