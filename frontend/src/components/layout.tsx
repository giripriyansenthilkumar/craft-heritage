import AppNavbar from "@/components/ui/app-navbar";
import { Chatbot } from "@/components/chatbot";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main>
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}
