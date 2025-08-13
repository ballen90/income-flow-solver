import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const categories = [
  { name: "Housing", value: 1600 },
  { name: "Dining", value: 620 },
  { name: "Groceries", value: 540 },
  { name: "Transport", value: 310 },
  { name: "Health", value: 220 },
  { name: "Entertainment", value: 180 },
];

const Spending = () => {
  return (
    <div className="space-y-6">
      <SEO
        title="Spending Analysis – Finlytics"
        description="Understand your spending patterns with category insights and trends."
      />
      <h1 className="text-2xl font-semibold tracking-tight">Spending Analysis</h1>
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>By category (this month)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--brand))" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Try setting a weekly Dining budget 15% below your 3-month average to nudge savings.</p>
          <p>Automate transfers to Savings right after payday to lock in your savings rate.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Spending;
