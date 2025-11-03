import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Globe, 
  Calendar,
  Users,
  Eye,
  Heart,
  Share2,
  Download,
  Filter
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AppNavbar } from "@/components/ui/app-navbar";

export default function Trends() {
  return (
    <>
      <AppNavbar />
      <TrendsContent />
    </>
  );
}

function TrendsContent() {
  const trendingCrafts = [
    {
      rank: 1,
      name: "Japanese Pottery",
      change: +34,
      trend: "up",
      views: "45.2K",
      engagement: "8.9K",
      region: "Asia",
      category: "Pottery"
    },
    {
      rank: 2,
      name: "Nordic Knitting",
      change: +28,
      trend: "up",
      views: "38.7K",
      engagement: "7.2K",
      region: "Europe",
      category: "Textile"
    },
    {
      rank: 3,
      name: "Mexican Ceramics",
      change: +15,
      trend: "up",
      views: "32.1K",
      engagement: "6.8K",
      region: "Americas",
      category: "Ceramics"
    },
    {
      rank: 4,
      name: "African Wood Carving",
      change: -5,
      trend: "down",
      views: "29.3K",
      engagement: "5.9K",
      region: "Africa",
      category: "Carving"
    },
    {
      rank: 5,
      name: "Indian Block Printing",
      change: +12,
      trend: "up",
      views: "27.8K",
      engagement: "5.4K",
      region: "Asia",
      category: "Printing"
    }
  ];

  const regionalData = [
    { region: "Asia", crafts: 1247, growth: "+18%", color: "text-primary" },
    { region: "Europe", crafts: 892, growth: "+12%", color: "text-secondary" },
    { region: "Americas", crafts: 673, growth: "+25%", color: "text-success" },
    { region: "Africa", crafts: 456, growth: "+8%", color: "text-accent" },
    { region: "Oceania", crafts: 234, growth: "+15%", color: "text-destructive" }
  ];

  const insights = [
    {
      title: "Rising Pottery Interest",
      description: "Traditional pottery techniques are experiencing a 40% increase in engagement this month.",
      category: "Pottery",
      impact: "High",
      recommendation: "Consider creating pottery content or tutorials to capitalize on this trend."
    },
    {
      title: "Sustainable Crafts Boom",
      description: "Eco-friendly and sustainable craft practices are gaining 60% more attention.",
      category: "Sustainability",
      impact: "Medium",
      recommendation: "Highlight environmental benefits of traditional crafts in your content."
    },
    {
      title: "Cross-Cultural Learning",
      description: "Users are increasingly interested in learning crafts from different cultures.",
      category: "Cultural",
      impact: "High",
      recommendation: "Collaborate with artisans from different regions for diverse content."
    }
  ];

  const monthlyStats = [
    { month: "Jan", views: 120, engagement: 85 },
    { month: "Feb", views: 135, engagement: 92 },
    { month: "Mar", views: 152, engagement: 108 },
    { month: "Apr", views: 148, engagement: 115 },
    { month: "May", views: 167, engagement: 128 },
    { month: "Jun", views: 189, engagement: 142 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Craft Trends Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover what's trending in the world of traditional crafts and cultural heritage
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="pottery">Pottery</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="carving">Carving</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trending Crafts */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Trending Crafts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingCrafts.map((craft, index) => (
                  <div 
                    key={craft.rank}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-smooth animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                        {craft.rank}
                      </div>
                      <div>
                        <div className="font-semibold">{craft.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {craft.region}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {craft.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {craft.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                        <span className={`text-sm font-medium ${
                          craft.trend === "up" ? "text-success" : "text-destructive"
                        }`}>
                          {craft.change > 0 ? "+" : ""}{craft.change}%
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {craft.views} views
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div 
                    key={insight.title}
                    className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <Badge 
                        variant={insight.impact === "High" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {insight.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    <div className="bg-card p-3 rounded-lg border-l-4 border-primary">
                      <p className="text-sm">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Regional Overview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Regional Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regionalData.map((region, index) => (
                  <div 
                    key={region.region}
                    className="flex items-center justify-between animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <div className="font-medium">{region.region}</div>
                      <div className="text-sm text-muted-foreground">
                        {region.crafts} crafts
                      </div>
                    </div>
                    <Badge variant="success" className="text-xs">
                      {region.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center animate-fade-in">
                  <div className="text-3xl font-bold gradient-text">189K</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4" />
                    Total Views
                  </div>
                  <Badge variant="success" className="mt-2">+12% from last month</Badge>
                </div>
                
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="text-3xl font-bold gradient-text">142K</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Heart className="w-4 h-4" />
                    Engagements
                  </div>
                  <Badge variant="success" className="mt-2">+18% from last month</Badge>
                </div>

                <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold gradient-text">2.1K</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Users className="w-4 h-4" />
                    New Artisans
                  </div>
                  <Badge variant="success" className="mt-2">+25% from last month</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Export Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
  );
}
