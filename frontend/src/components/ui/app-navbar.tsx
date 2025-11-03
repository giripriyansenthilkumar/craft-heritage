// frontend/src/components/ui/app-navbar.tsx

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-primary">
          ArtConnect
        </Link>
        <Link to="/explore" className="text-gray-700 hover:text-primary transition">
          Explore
        </Link>
        <Link to="/community" className="text-gray-700 hover:text-primary transition">
          Community
        </Link>
        <Link to="/lessons" className="text-gray-700 hover:text-primary transition">
          Lessons
        </Link>
        <Link to="/trends" className="text-gray-700 hover:text-primary transition">
          Trends
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild variant="default" size="sm">
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    </nav>
  );
}
