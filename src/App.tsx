
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Database from "./pages/Database";
import BatteryDetail from "./pages/BatteryDetail";
import AddBattery from "./pages/AddBattery";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import BatteryGroups from "./pages/BatteryGroups";
import BatteryGroupDetail from "./pages/BatteryGroupDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SplashScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/database" element={<Database />} />
          <Route path="/battery/:id" element={<BatteryDetail />} />
          <Route path="/add" element={<AddBattery />} />
          <Route path="/groups" element={<BatteryGroups />} />
          <Route path="/groups/:name" element={<BatteryGroupDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
