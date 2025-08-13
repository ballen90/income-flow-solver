import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import React from "react";

type Debt = { id: string; name: string; balance: number; rate: number; min: number };

const initialDebts: Debt[] = [
  { id: "1", name: "Credit Card A", balance: 4500, rate: 0.2499, min: 125 },
  { id: "2", name: "Student Loan", balance: 12000, rate: 0.055, min: 150 },
  { id: "3", name: "Auto Loan", balance: 8000, rate: 0.069, min: 220 },
];

type Plan = {
  months: number;
  interestPaid: number;
  order: string[]; // names in payoff order
};

function simulatePayoff(debts: Debt[], method: "snowball" | "avalanche", extra: number): Plan {
  // Deep copy
  const ds = debts.map((d) => ({ ...d }));
  let month = 0;
  let interestPaid = 0;
  const ordered: string[] = [];

  // Determine target ordering
  const sortFn = method === "snowball"
    ? (a: Debt, b: Debt) => a.balance - b.balance
    : (a: Debt, b: Debt) => b.rate - a.rate;

  const order = [...ds].sort(sortFn).map((d) => d.id);

  while (ds.some((d) => d.balance > 0.01) && month < 600) {
    month++;
    // Apply interest
    for (const d of ds) {
      const interest = d.balance * (d.rate / 12);
      d.balance += interest;
      interestPaid += interest;
    }
    // Determine current target
    const targetId = order.find((id) => ds.find((d) => d.id === id && d.balance > 0.01));
    // Apply payments
    for (const d of ds) {
      const isTarget = d.id === targetId;
      const payment = d.min + (isTarget ? extra : 0);
      d.balance = Math.max(0, d.balance - payment);
      if (d.balance <= 0.01 && !ordered.includes(d.name)) ordered.push(d.name);
    }
  }

  return { months: month, interestPaid, order: ordered };
}

const Debts = () => {
  const [debts] = React.useState<Debt[]>(initialDebts);
  const [method, setMethod] = React.useState<"snowball" | "avalanche">("snowball");
  const [extra, setExtra] = React.useState(250);

  const plan = simulatePayoff(debts, method, extra);

  return (
    <div className="space-y-6">
      <SEO
        title="Debt Payoff Optimizer – Finlytics"
        description="Optimize your debt payoff with snowball or avalanche based on your real payments."
      />
      <h1 className="text-2xl font-semibold tracking-tight">Debt Payoff Optimizer</h1>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>Strategy</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Method</Label>
            <RadioGroup value={method} onValueChange={(v) => setMethod(v as any)} className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="snowball" id="snowball" />
                <Label htmlFor="snowball">Snowball (smallest first)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="avalanche" id="avalanche" />
                <Label htmlFor="avalanche">Avalanche (highest rate)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="extra">Extra monthly payment ($)</Label>
            <Input id="extra" type="number" value={extra}
              onChange={(e) => setExtra(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <div className="rounded-md border p-3 text-sm">
              <p><span className="text-muted-foreground">Months to debt-free:</span> <strong>{plan.months}</strong></p>
              <p><span className="text-muted-foreground">Estimated interest:</span> <strong>${plan.interestPaid.toFixed(0)}</strong></p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>Payoff order</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-6 space-y-2">
            {plan.order.map((name, idx) => (
              <li key={name} className="">
                <span className="font-medium">{name}</span>
                {idx === 0 && <span className="ml-2 text-xs text-muted-foreground">(primary focus)</span>}
              </li>
            ))}
          </ol>
          <Button className="mt-4" asChild>
            <a href="/spending">Refine with spending insights</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Debts;
