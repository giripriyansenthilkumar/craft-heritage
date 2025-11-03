import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppNavbar } from "@/components/ui/app-navbar";
import { 
  Upload, 
  Eye, 
  Users, 
  Volume2, 
  Plus,
  BarChart3,
  Share2,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <AppNavbar />
      <DashboardContent />
    </>
  );
}

function DashboardContent() {
  const kpiData = [
    { 
      title: "Total Uploads", 
      value: "24", 
      change: "+3 this month",
      icon: Upload,
      color: "text-primary"
    },
    { 
      title: "Total Views", 
      value: "12.5K", 
      change: "+1.2K this week",
      icon: Eye,
      color: "text-secondary"
    },
    { 
      title: "Community Reach", 
      value: "856", 
      change: "+67 followers",
      icon: Users,
      color: "text-success" 
    },
    { 
      title: "Audio Plays", 
      value: "3.2K", 
      change: "+45% increase",
      icon: Volume2,
      color: "text-accent"
    }
  ];

  const recentActivity = [
    {
      type: "upload",
      title: "Traditional Pottery Wheel Technique",
      time: "2 hours ago",
      views: 127,
      status: "published"
    },
    {
      type: "comment",
      title: "Comment on 'Weaving Patterns'",
      time: "5 hours ago",
      views: null,
      status: "replied"
    },
    {
      type: "like",
      title: "15 new likes on 'Ceramic Glazing'",
      time: "1 day ago",
      views: null,
      status: "liked"
    },
    {
      type: "follow",
      title: "Maria_Crafts started following you",
      time: "2 days ago",
      views: null,
      status: "followed"
    }
  ];

  const quickActions = [
    {
      title: "Upload New Craft",
      description: "Share your latest creation",
      icon: Upload,
      variant: "hero" as const,
      href: "/upload"
    },
    {
      title: "View My Gallery",
      description: "See all your uploads",
      icon: Eye,
      variant: "outline" as const,
      href: "/gallery"
    },
    {
      title: "Share Profile",
      description: "Invite others to follow",
      icon: Share2,
      variant: "secondary" as const,
      href: "/profile"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2 gradient-text">
              Artisan Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your crafts.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <Card 
                  key={kpi.title} 
                  className="hover:scale-105 transition-bounce shadow-soft hover:shadow-medium animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${kpi.color} bg-current/10 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${kpi.color}`} />
                      </div>
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                    <div className="text-sm text-muted-foreground mb-2">{kpi.title}</div>
                    <Badge variant="secondary" className="text-xs">
                      {kpi.change}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest interactions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-smooth animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {activity.type === "upload" && <Upload className="w-5 h-5 text-primary" />}
                          {activity.type === "comment" && <MessageSquare className="w-5 h-5 text-secondary" />}
                          {activity.type === "like" && <Heart className="w-5 h-5 text-success" />}
                          {activity.type === "follow" && <Users className="w-5 h-5 text-accent" />}
                        </div>
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.views && (
                          <div className="text-sm font-medium">{activity.views} views</div>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Manage your artisan profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.title}
                        variant={action.variant}
                        className="w-full justify-start h-auto p-4 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-medium">{action.title}</div>
                            <div className="text-xs opacity-70">{action.description}</div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Stats Chart Card */}
              <Card className="mt-6 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Views This Week</span>
                      <Badge variant="success">+24%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-smooth" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engagement Rate</span>
                      <Badge variant="secondary">85%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full transition-smooth" style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Community Growth</span>
                      <Badge variant="outline">+12</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full transition-smooth" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
