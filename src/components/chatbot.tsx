import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Palette, 
  Volume2, 
  Globe,
  Sparkles,
  Bot
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Welcome to ArtConnect! 🎨 I'm here to help you discover traditional crafts, connect with artisans, and learn about cultural heritage. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);

  const quickActions = [
    { text: "Find pottery lessons", icon: Palette },
    { text: "Browse crafts by region", icon: Globe },
    { text: "Audio narration help", icon: Volume2 },
    { text: "Trending crafts today", icon: Sparkles }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: message,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        content: getBotResponse(message),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("pottery") || lowerMessage.includes("ceramic")) {
      return "I'd love to help you with pottery! 🏺 We have amazing pottery lessons from Master Kenji and traditional ceramic workshops from various cultures. Would you like me to show you beginner-friendly options or advanced techniques?";
    }
    
    if (lowerMessage.includes("textile") || lowerMessage.includes("weaving")) {
      return "Textile arts are fascinating! 🧶 From Peruvian weaving to Nordic knitting, we have incredible stories and techniques. Are you interested in learning specific patterns or exploring different cultural approaches?";
    }
    
    if (lowerMessage.includes("region") || lowerMessage.includes("country")) {
      return "Our artisans represent 89 countries! 🌍 Which region interests you? We have beautiful crafts from Asia, Europe, Africa, Americas, and Oceania. Each region has unique techniques and cultural stories.";
    }
    
    if (lowerMessage.includes("learn") || lowerMessage.includes("lesson")) {
      return "Perfect! 📚 We have interactive lessons for all skill levels. You can start with fundamentals or dive into specific techniques. Many lessons include audio narration and step-by-step guidance. What craft interests you most?";
    }
    
    return "That's a great question! ✨ I can help you explore traditional crafts, find lessons, connect with artisans, or discover trending techniques. Feel free to ask about specific crafts, regions, or learning paths. What would you like to explore?";
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full shadow-large hover:shadow-glow gradient-artisan group transition-bounce"
            size="icon"
          >
            <div className="relative">
              <Palette className="w-6 h-6 text-white group-hover:scale-110 transition-smooth" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
          </Button>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 animate-bounce-in">
          <Card className="shadow-large border-2 border-primary/20">
            <CardHeader className="p-4 gradient-hero text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">ArtConnect Assistant</CardTitle>
                    <div className="text-xs opacity-90">Here to help with crafts & culture</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/30">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="w-8 h-8">
                      {msg.sender === "bot" ? (
                        <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" />
                      )}
                      <AvatarFallback>
                        {msg.sender === "bot" ? "AI" : "You"}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                      <div
                        className={`inline-block p-3 rounded-2xl max-w-xs text-sm transition-smooth ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-card shadow-soft"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-3">Quick actions:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.text)}
                          className="text-xs h-auto p-2 hover:scale-105 transition-bounce"
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {action.text}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about crafts, lessons, or artisans..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    variant="hero"
                    size="sm"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Volume2 className="w-3 h-3" />
                  <span>Audio support available</span>
                  <Badge variant="outline" className="text-xs">
                    <Globe className="w-2 h-2 mr-1" />
                    Multilingual
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}