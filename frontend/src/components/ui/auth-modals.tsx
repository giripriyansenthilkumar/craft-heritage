import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
  onSubmit?: (mode: "signin" | "signup", username: string, password: string) => Promise<any>;
  error?: string | null;
  success?: string | null;
}
export function AuthModals({ isOpen, onClose, mode, onModeChange, onSubmit, error, success }: AuthModalsProps) {

  const [userType, setUserType] = useState<"user" | "artisan">("user");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-background shadow-large" aria-describedby="auth-modal-desc">
        <div id="auth-modal-desc" className="sr-only">
          {mode === "signin" ? "Sign in to ArtConnect." : "Sign up for ArtConnect."}
        </div>
        <div className="artisan-pattern min-h-[500px]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-display gradient-text text-center">
              {mode === "signin" ? "Welcome Back" : "Join ArtConnect"}
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <Tabs value={mode} onValueChange={(value) => {
              console.log("Tab changed to:", value);
              onModeChange(value as "signin" | "signup");
            }}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="transition-smooth">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="transition-smooth">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="space-y-4 animate-fade-in">
                <AuthForm 
                  mode="signin" 
                  userType={userType} 
                  onUserTypeChange={setUserType} 
                  onClose={onClose}
                  onModeChange={onModeChange}
                  onSubmit={typeof onSubmit === "function" ? onSubmit : undefined}
                  error={typeof error === "string" ? error : null}
                  success={typeof success === "string" ? success : null}
                />
              </TabsContent>
              <TabsContent value="signup" className="space-y-4 animate-fade-in">
                <AuthForm 
                  mode="signup" 
                  userType={userType} 
                  onUserTypeChange={setUserType} 
                  onClose={onClose}
                  onModeChange={onModeChange}
                  onSubmit={typeof onSubmit === "function" ? onSubmit : undefined}
                  error={typeof error === "string" ? error : null}
                  success={typeof success === "string" ? success : null}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AuthFormProps {
  mode: "signin" | "signup";
  userType: "user" | "artisan";
  onUserTypeChange: (type: "user" | "artisan") => void;
  onClose: () => void;
  onModeChange: (mode: "signin" | "signup") => void;
  onSubmit?: (mode: "signin" | "signup", username: string, password: string) => Promise<any>;
  error?: string | null;
  success?: string | null;
}

function AuthForm({ mode, userType, onUserTypeChange, onClose, onModeChange, onSubmit, error, success }: AuthFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  // Default API submit logic if onSubmit is not provided
  const defaultSubmit = async (mode: "signin" | "signup", username: string, password: string) => {
    setLocalError(null);
    setLocalSuccess(null);
    try {
      if (mode === "signup") {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setLocalError(data.error || "Signup failed.");
          return { success: false, error: data.error };
        }
        setLocalSuccess("Signup successful! Please sign in.");
        toast({
          title: "Signup successful",
          description: "You can now sign in.",
          variant: "default",
        });
        return { success: true };
      } else {
        const res = await fetch(`${API_URL}/api/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setLocalError(data.error || "Signin failed.");
          return { success: false, error: data.error };
        }
        // Store JWT token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setLocalSuccess("Signin successful!");
        toast({
          title: "Signin successful",
          description: "Welcome back!",
          variant: "default",
        });
        return { success: true };
      }
    } catch (err) {
      setLocalError("Network error. Please try again.");
      return { success: false, error: "Network error" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);
    setLocalSuccess(null);
    try {
      if (mode === "signup" && formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      const submitFn = onSubmit || defaultSubmit;
      const result = await submitFn(mode, formData.username, formData.password);
      // If sign-in is successful, close modal and redirect
      if (mode === "signin" && result && result.success) {
        onClose(); // <-- Close the modal after successful signin
        if (userType === "artisan") {
          navigate("/artisan-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
      // If signup is successful, switch to signin tab
      if (mode === "signup" && result && result.success) {
        onModeChange("signin");
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      {/* User Type Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">I am a...</Label>
        <div className="grid grid-cols-2 gap-2">
          <Card 
            className={`cursor-pointer transition-smooth border-2 ${
              userType === "user" 
                ? "border-primary bg-primary/5 shadow-soft" 
                : "border-border hover:border-muted-foreground"
            }`}
            onClick={() => onUserTypeChange("user")}
          >
            <CardContent className="p-3 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Craft Explorer</div>
              <div className="text-xs text-muted-foreground">Learn & Discover</div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-smooth border-2 ${
              userType === "artisan" 
                ? "border-primary bg-primary/5 shadow-soft" 
                : "border-border hover:border-muted-foreground"
            }`}
            onClick={() => onUserTypeChange("artisan")}
          >
            <CardContent className="p-3 text-center">
              <Palette className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Artisan</div>
              <div className="text-xs text-muted-foreground">Share & Teach</div>
            </CardContent>
          </Card>
        </div>
        {userType === "artisan" && (
          <Badge variant="secondary" className="w-full justify-center animate-bounce-in">
            ✨ Share your craft with the world
          </Badge>
        )}
      </div>

      <Separator />

      {/* Error/Success Messages */}
      {(error || localError) && (
        <div className="flex items-center justify-center gap-2 mb-2 p-2 rounded bg-red-100 border border-red-400 text-red-700 font-semibold animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8.707-2.707a1 1 0 011.414 0L10 8.586l.293-.293a1 1 0 111.414 1.414L11.414 10l.293.293a1 1 0 01-1.414 1.414L10 11.414l-.293.293a1 1 0 01-1.414-1.414L8.586 10l-.293-.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          <span>{error || localError}</span>
        </div>
      )}
      {(success || localSuccess) && (
        <div className="text-center text-sm text-green-600 font-semibold animate-fade-in">
          {success || localSuccess}
        </div>
      )}
      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            type="text" 
            placeholder="your username"
            value={formData.username}
            onChange={handleInputChange}
            className="transition-smooth focus:shadow-soft"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="transition-smooth focus:shadow-soft"
            required
          />
        </div>

        {mode === "signup" && (
          <div className="space-y-1 animate-fade-in">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="transition-smooth focus:shadow-soft"
              required
            />
          </div>
        )}

        <Button 
          type="submit"
          variant="hero" 
          className="w-full transition-bounce"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : mode === "signin" 
            ? `Sign In as ${userType === "artisan" ? "Artisan" : "Explorer"}`
            : `Create ${userType === "artisan" ? "Artisan" : "Explorer"} Account`
          }
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {mode === "signin" ? (
          <>Don't have an account? <button type="button" className="text-primary hover:underline" onClick={() => onModeChange("signup")}>Sign up</button></>
        ) : (
          <>Already have an account? <button type="button" className="text-primary hover:underline" onClick={() => onModeChange("signin")}>Sign in</button></>
        )}
      </div>
    </div>
  );
}
