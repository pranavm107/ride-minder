import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthProvider";
import AuthPage from "./pages/AuthPage";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReceiptPage from "./pages/ReceiptPage";
import NotFound from "./pages/NotFound";
import RouteStopsPage from "./pages/RouteStopsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import GuestDashboard from "./pages/guest/GuestDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import TripHistoryPage from "./pages/TripHistoryPage";
import StudentAttendancePage from "./pages/StudentAttendancePage";
import BillUploadsPage from "./pages/BillUploadsPage";
import DriverRewardsPage from "./pages/DriverRewardsPage";
import SubstituteHistoryPage from "./pages/SubstituteHistoryPage";
import CustomerSupportPage from "./pages/CustomerSupportPage";
import CameraControlPage from "./pages/CameraControlPage";
import DriverDocumentsPage from "./pages/DriverDocumentsPage";
import StudentCommunityPage from "./pages/StudentCommunityPage";
import AvailableRidesPage from "./pages/AvailableRidesPage";
import LocationManagement from "./pages/LocationManagement";
import NavRedirector from "./components/NavRedirector";

const queryClient = new QueryClient();

// Animation wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <NavRedirector />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        
        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/guest/dashboard" element={<GuestDashboard />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/route-stops" element={<RouteStopsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Driver Routes */}
        <Route path="/trip-history" element={<TripHistoryPage />} />
        <Route path="/attendance" element={<StudentAttendancePage />} />
        <Route path="/bill-uploads" element={<BillUploadsPage />} />
        <Route path="/coins" element={<DriverRewardsPage />} />
        <Route path="/substitute-history" element={<SubstituteHistoryPage />} />
        <Route path="/customer-support" element={<CustomerSupportPage />} />
        
        {/* Admin Routes */}
        <Route path="/camera-control" element={<CameraControlPage />} />
        <Route path="/driver-documents" element={<DriverDocumentsPage />} />
        <Route path="/location-management" element={<LocationManagement />} />
        
        {/* Student Routes */}
        <Route path="/community" element={<StudentCommunityPage />} />
        <Route path="/available-rides" element={<AvailableRidesPage />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <AnimatedRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
