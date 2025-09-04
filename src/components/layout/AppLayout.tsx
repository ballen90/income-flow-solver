import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Wallet, PieChart, PiggyBank, Settings as SettingsIcon } from "lucide-react";
import React from "react";

const NavLinkItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm transition-smooth ${
        isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
      }`
    }
  >
    {label}
  </NavLink>
);

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const onConnect = () => {
    toast(
      "To enable real bank account linking and data sync, connect Supabase in Lovable (top-right green button)."
    );
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-hero shadow-glow" aria-hidden />
            <span className="font-semibold tracking-tight">Finlytics</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLinkItem to="/" label="Dashboard" />
            <NavLinkItem to="/accounts" label="Accounts" />
            <NavLinkItem to="/spending" label="Spending" />
            <NavLinkItem to="/debts" label="Debts" />
            <NavLinkItem to="/settings" label="Settings" />
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden sm:inline-flex" asChild>
              <Link to="/spending" aria-label="Analyze spending">
                <PieChart className="mr-2" /> Analyze
              </Link>
            </Button>
            <Button variant="hero" onClick={onConnect} aria-label="Connect accounts">
              <Wallet className="mr-2" /> Connect
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
      <footer className="border-t py-6 text-sm text-muted-foreground">
        <div className="container flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Finlytics</p>
          <div className="flex items-center gap-3">
            <Link to="/settings" className="inline-flex items-center gap-1 hover:text-foreground">
              <SettingsIcon className="size-4" /> Settings
            </Link>
            <Link to="/debts" className="inline-flex items-center gap-1 hover:text-foreground">
              <PiggyBank className="size-4" /> Optimize Debts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
