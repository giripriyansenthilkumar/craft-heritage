import { Navbar } from "@/components/navbar";
import { Chatbot } from "@/components/chatbot";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}