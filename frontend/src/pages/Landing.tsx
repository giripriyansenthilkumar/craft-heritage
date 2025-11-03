import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Compass, 
  BookOpen, 
  Users, 
  Palette, 
  Heart,
  Star,
  Globe,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { AuthModals } from "@/components/ui/auth-modals";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/navbar";

// Types for backend response
type AuthApiResponse = {
  token?: string;
  message?: string;
  error?: string;
};

// Simple API utility for authentication
async function authApi(mode: "signin" | "signup", username: string, password: string): Promise<{ success: boolean; data?: AuthApiResponse; error?: string }> {
  const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/signin";
  try {
    const res = await fetch(`http://localhost:5000${endpoint}` , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    let data: AuthApiResponse = {};
    try {
      data = await res.json();
    } catch (jsonErr) {
      // If response is not JSON
      return { success: false, error: "Server returned invalid response." };
    }
    console.log("authApi response:", res.status, data); // Debug log
    if (!res.ok) throw new Error(data.error || "Unknown error");
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    return { success: true, data };
  } catch (err: any) {
    console.error("authApi error:", err); // Debug log
    if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
      return { success: false, error: "Cannot connect to backend. Is the server running?" };
    }
    return { success: false, error: err.message };
  }
}
import heroWeaver from "@/assets/hero-weaver.jpg";
import heroPotter from "@/assets/hero-potter.jpg";
import heroPainter from "@/assets/hero-painter.jpg";
import culturalPattern from "@/assets/cultural-pattern.jpg";

export default function Landing() {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "signin" | "signup";
  }>({ isOpen: false, mode: "signin" });
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAuth = (mode: "signin" | "signup") => {
    setAuthModal({ isOpen: true, mode });
    setAuthError(null);
    setAuthSuccess(null);
  };

  // Handler for AuthModals
  const handleAuthSubmit = async (mode: "signin" | "signup", username: string, password: string) => {
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const result = await authApi(mode, username, password);
      console.log("handleAuthSubmit result:", result); // Debug log
      if (result.success && result.data) {
        setAuthSuccess(result.data.message || "Success!");
        toast({
          title: "Success",
          description: result.data.message || "Authentication successful!",
          variant: "default",
        });
        setTimeout(() => {
          setAuthModal({ ...authModal, isOpen: false });
        }, 1000);
      } else {
        setAuthError(result.error);
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        console.error("handleAuthSubmit error:", result.error); // Debug log
      }
    } catch (err: any) {
      setAuthError("Unexpected error occurred.");
      toast({
        title: "Error",
        description: "Unexpected error occurred.",
        variant: "destructive",
      });
      console.error("handleAuthSubmit catch error:", err);
    }
  };

  const features = [
    {
      icon: Upload,
      title: "Share Your Craft",
      description: "Upload and tell the story behind your traditional craft",
      color: "text-primary"
    },
    {
      icon: Compass,
      title: "Explore Heritage",
      description: "Discover crafts from cultures around the world",
      color: "text-secondary"
    },
    {
      icon: BookOpen,
      title: "Learn Techniques",
      description: "Interactive lessons from master artisans",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Connect Community",
      description: "Join a global community of craft enthusiasts",
      color: "text-success"
    }
  ];

  const stats = [
    { number: "10K+", label: "Artisans", icon: Palette },
    { number: "50+", label: "Countries", icon: Globe },
    { number: "1M+", label: "Stories Shared", icon: Heart },
    { number: "4.9", label: "User Rating", icon: Star }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${culturalPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Floating Artisan Images */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={heroWeaver} 
            alt="Traditional weaver" 
            className="absolute top-20 left-10 w-48 h-32 object-cover rounded-2xl shadow-large animate-float opacity-90 hidden lg:block"
            style={{ animationDelay: '0s' }}
          />
          <img 
            src={heroPotter} 
            alt="Traditional potter" 
            className="absolute top-40 right-16 w-56 h-36 object-cover rounded-2xl shadow-large animate-float opacity-90 hidden lg:block"
            style={{ animationDelay: '1s' }}
          />
          <img 
            src={heroPainter} 
            alt="Traditional artist" 
            className="absolute bottom-32 left-20 w-52 h-34 object-cover rounded-2xl shadow-large animate-float opacity-90 hidden lg:block"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <Badge variant="secondary" className="mb-6 animate-bounce-in bg-white/10 text-white border-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Celebrating Heritage Through Technology
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up">
            ArtConnect
          </h1>
          
          <div className="text-2xl md:text-3xl font-display mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Preserve. Tell. Learn.
            </span>
          </div>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.4s' }}>
            Join a global community preserving traditional crafts through storytelling and technology
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => handleAuth("signup")}
              className="group"
            >
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-bounce" />
              Upload Your Craft
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              onClick={() => handleAuth("signup")}
            >
              <Compass className="w-5 h-5 mr-2" />
              Explore Crafts
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center border-0 bg-transparent animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 artisan-pattern">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
              Bridging Tradition & Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how ArtConnect connects artisans with craft enthusiasts worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="group hover:scale-105 transition-bounce shadow-soft hover:shadow-large animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${feature.color} bg-current/10`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Whether you're an artisan preserving tradition or someone eager to learn, 
            your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-primary transition-smooth"
              onClick={() => handleAuth("signup")}
            >
              <Palette className="w-5 h-5 mr-2" />
              I'm an Artisan
            </Button>
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => handleAuth("signup")}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              I Want to Learn
            </Button>
          </div>
        </div>
      </section>

      {/* AuthModals with backend integration */}
      <AuthModals 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ ...authModal, mode })}
        onSubmit={handleAuthSubmit}
        error={authError}
        success={authSuccess}
      />
      </div>
    </>
  );
}
