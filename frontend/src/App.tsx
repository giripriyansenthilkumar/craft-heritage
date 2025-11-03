import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Lessons from "./pages/Lessons";
import Trends from "./pages/Trends";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes in ms

const App = () => {
  const navigate = useNavigate ? useNavigate() : () => {};
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Logout function: clear token and redirect to login
  const logout = () => {
    localStorage.removeItem("token");
    // You may want to clear other user/session data here
    navigate("/"); // Redirect to landing/login page
  };

  // Reset inactivity timer
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    // List of events that indicate user activity
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start timer on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="explore" element={<Explore />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="trends" element={<Trends />} />
              <Route path="community" element={<Community />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
