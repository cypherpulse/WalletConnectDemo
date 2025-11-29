import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppKitProvider } from './config/wagmi';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Main App component with AppKit wallet provider and routing
// Theme colors (green/orange/black) are applied globally through CSS variables and Tailwind classes

const App = () => (
  <AppKitProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AppKitProvider>
);

export default App;
