
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReceiptPage from "./pages/ReceiptPage";
import NotFound from "./pages/NotFound";
import RouteStopsPage from "./pages/RouteStopsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import StudentLogin from "./pages/login/StudentLogin";
import DriverLogin from "./pages/login/DriverLogin";
import AdminLogin from "./pages/login/AdminLogin";
import ForgotPassword from "./pages/login/ForgotPassword";

const queryClient = new QueryClient();

// Animation wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        
        {/* Authentication Routes */}
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/driver" element={<DriverLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/route-stops" element={<RouteStopsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AnimatedRoutes />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
