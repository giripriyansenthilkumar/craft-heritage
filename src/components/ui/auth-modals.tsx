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

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

export function AuthModals({ isOpen, onClose, mode, onModeChange }: AuthModalsProps) {
  const [userType, setUserType] = useState<"user" | "artisan">("user");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-background shadow-large">
        <div className="artisan-pattern min-h-[500px]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-display gradient-text text-center">
              {mode === "signin" ? "Welcome Back" : "Join ArtConnect"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
            <Tabs value={mode} onValueChange={(value) => onModeChange(value as "signin" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="transition-smooth">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="transition-smooth">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 animate-fade-in">
                <AuthForm mode="signin" userType={userType} onUserTypeChange={setUserType} />
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 animate-fade-in">
                <AuthForm mode="signup" userType={userType} onUserTypeChange={setUserType} />
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
}

function AuthForm({ mode, userType, onUserTypeChange }: AuthFormProps) {
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

      {/* Sample Credentials */}
      {mode === "signin" && (
        <Card className="bg-muted/50 border-dashed animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              🔑 Sample Login Credentials
            </CardTitle>
            <CardDescription className="text-xs">
              Use these credentials to test the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="space-y-1">
              <div className="font-medium text-primary">Craft Explorer:</div>
              <div className="font-mono bg-background px-2 py-1 rounded">explorer@artconnect.com</div>
              <div className="font-mono bg-background px-2 py-1 rounded">password123</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-secondary">Artisan:</div>
              <div className="font-mono bg-background px-2 py-1 rounded">artisan@artconnect.com</div>
              <div className="font-mono bg-background px-2 py-1 rounded">craftmaker456</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Fields */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your@email.com"
            className="transition-smooth focus:shadow-soft"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••"
            className="transition-smooth focus:shadow-soft"
          />
        </div>

        {mode === "signup" && (
          <div className="space-y-1 animate-fade-in">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••"
              className="transition-smooth focus:shadow-soft"
            />
          </div>
        )}
      </div>

      <Button 
        variant="hero" 
        className="w-full transition-bounce"
        size="lg"
      >
        {mode === "signin" 
          ? `Sign In as ${userType === "artisan" ? "Artisan" : "Explorer"}`
          : `Create ${userType === "artisan" ? "Artisan" : "Explorer"} Account`
        }
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {mode === "signin" ? (
          <>Don't have an account? <button className="text-primary hover:underline">Sign up</button></>
        ) : (
          <>Already have an account? <button className="text-primary hover:underline">Sign in</button></>
        )}
      </div>
    </div>
  );
}