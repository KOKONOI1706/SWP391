import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<div className="p-8"><h1 className="text-2xl font-bold">Map View</h1><p className="text-muted-foreground">Interactive map with charging stations (Coming Soon)</p></div>} />
        <Route path="/reservations" element={<div className="p-8"><h1 className="text-2xl font-bold">Reservations</h1><p className="text-muted-foreground">Manage your charging reservations (Coming Soon)</p></div>} />
        <Route path="/charging" element={<div className="p-8"><h1 className="text-2xl font-bold">Charging Session</h1><p className="text-muted-foreground">Monitor your charging progress (Coming Soon)</p></div>} />
        <Route path="/payments" element={<div className="p-8"><h1 className="text-2xl font-bold">Payments</h1><p className="text-muted-foreground">Manage payment methods (Coming Soon)</p></div>} />
        <Route path="/reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">View charging analytics (Coming Soon)</p></div>} />
        <Route path="/sessions" element={<div className="p-8"><h1 className="text-2xl font-bold">Active Sessions</h1><p className="text-muted-foreground">Manage charging sessions (Coming Soon)</p></div>} />
        <Route path="/payment-management" element={<div className="p-8"><h1 className="text-2xl font-bold">Payment Management</h1><p className="text-muted-foreground">Handle on-site payments (Coming Soon)</p></div>} />
        <Route path="/issues" element={<div className="p-8"><h1 className="text-2xl font-bold">Issue Reporting</h1><p className="text-muted-foreground">Report and track issues (Coming Soon)</p></div>} />
        <Route path="/stations" element={<div className="p-8"><h1 className="text-2xl font-bold">Station Management</h1><p className="text-muted-foreground">Manage charging stations (Coming Soon)</p></div>} />
        <Route path="/users" element={<div className="p-8"><h1 className="text-2xl font-bold">User Management</h1><p className="text-muted-foreground">Manage platform users (Coming Soon)</p></div>} />
        <Route path="/subscriptions" element={<div className="p-8"><h1 className="text-2xl font-bold">Subscription Packages</h1><p className="text-muted-foreground">Manage subscription plans (Coming Soon)</p></div>} />
        <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">System configuration (Coming Soon)</p></div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
