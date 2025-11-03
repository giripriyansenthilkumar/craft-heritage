import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Compass, 
  BookOpen, 
  TrendingUp, 
  Users, 
  User,
  Menu,
  X,
  Palette,
  Sun,
  Moon
} from "lucide-react";
import { AuthModals } from "@/components/ui/auth-modals";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Lessons", href: "/lessons", icon: BookOpen },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Community", href: "/community", icon: Users },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "signin" | "signup";
  }>({ isOpen: false, mode: "signin" });
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  // Check authentication status from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const isActive = (path: string) => location.pathname === path;

  const handleAuth = (mode: "signin" | "signup") => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group transition-smooth"
            >
              <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center group-hover:scale-110 transition-bounce">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold gradient-text">
                ArtConnect
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary shadow-soft"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Theme Toggle & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="transition-smooth"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="transition-smooth"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleAuth("signin")}
                    className="transition-smooth"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={() => handleAuth("signup")}
                    className="transition-bounce"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
                {isAuthenticated && navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-smooth ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <div className={`${isAuthenticated ? 'pt-4 border-t border-border' : ''}`}>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="ml-6">Toggle Theme</span>
                    </Button>
                    {isAuthenticated ? (
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={handleSignOut}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => handleAuth("signin")}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                        <Button 
                          variant="hero" 
                          className="w-full" 
                          onClick={() => handleAuth("signup")}
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModals 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ ...authModal, mode })}
      />
    </>
  );
}