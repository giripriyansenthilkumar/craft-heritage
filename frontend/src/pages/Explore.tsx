import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Heart, 
  Play, 
  MapPin, 
  Clock,
  User,
  Volume2,
  BookOpen
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AppNavbar } from "@/components/ui/app-navbar";

export default function Explore() {
  return (
    <>
      <AppNavbar />
      <ExploreContent />
    </>
  );
}

function ExploreContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const crafts = [
    {
      id: 1,
      title: "Traditional Japanese Pottery",
      artisan: "Kenji Yamamoto",
      region: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
      type: "Pottery",
      duration: "45 min",
      views: "2.1K",
      likes: 89,
      hasAudio: true,
      hasLesson: true,
      featured: true
    },
    {
      id: 2,
      title: "Peruvian Textile Weaving",
      artisan: "Maria Quispe",
      region: "Cusco, Peru",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&h=300&fit=crop",
      type: "Textile",
      duration: "32 min",
      views: "1.8K",
      likes: 134,
      hasAudio: true,
      hasLesson: false,
      featured: false
    },
    {
      id: 3,
      title: "Indian Block Printing",
      artisan: "Ravi Sharma",
      region: "Rajasthan, India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      type: "Printing",
      duration: "28 min",
      views: "3.2K",
      likes: 156,
      hasAudio: true,
      hasLesson: true,
      featured: false
    },
    {
      id: 4,
      title: "African Wood Carving",
      artisan: "Kwame Asante",
      region: "Ghana, Africa",
      image: "https://images.unsplash.com/photo-1616547771554-6a3c4c5fad6d?w=400&h=300&fit=crop",
      type: "Carving",
      duration: "52 min",
      views: "1.5K",
      likes: 98,
      hasAudio: false,
      hasLesson: true,
      featured: true
    },
    {
      id: 5,
      title: "Mexican Talavera Ceramics",
      artisan: "Isabella Rodriguez",
      region: "Puebla, Mexico",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
      type: "Ceramics",
      duration: "41 min",
      views: "2.7K",
      likes: 203,
      hasAudio: true,
      hasLesson: false,
      featured: false
    },
    {
      id: 6,
      title: "Nordic Knitting Patterns",
      artisan: "Astrid Larsson",
      region: "Stockholm, Sweden",
      image: "https://images.unsplash.com/photo-1559395338-b5e6ead3442a?w=400&h=300&fit=crop",
      type: "Knitting",
      duration: "36 min",
      views: "1.9K",
      likes: 167,
      hasAudio: true,
      hasLesson: true,
      featured: false
    }
  ];

  const craftTypes = ["All", "Pottery", "Textile", "Printing", "Carving", "Ceramics", "Knitting"];
  const regions = ["All Regions", "Asia", "Europe", "Africa", "Americas", "Oceania"];

  const filteredCrafts = crafts.filter(craft =>
    craft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    craft.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    craft.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Explore Traditional Crafts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the rich heritage of traditional crafts from artisans around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* Search */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Search Crafts</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by craft, artisan, or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 transition-smooth focus:shadow-soft"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium">Craft Type</label>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {craftTypes.map(type => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
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
                    {regions.map(region => (
                      <SelectItem key={region} value={region.toLowerCase()}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="icon" className="self-end">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Found {filteredCrafts.length} traditional crafts
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">🔥 Trending</Badge>
            <Badge variant="outline">✨ Featured</Badge>
          </div>
        </div>

        {/* Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrafts.map((craft, index) => (
            <Card 
              key={craft.id} 
              className={`group hover:scale-105 transition-bounce cursor-pointer shadow-soft hover:shadow-large animate-fade-in ${
                craft.featured ? "ring-2 ring-primary/20" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={craft.image}
                  alt={craft.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {craft.featured && (
                    <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  )}
                  <Badge variant="secondary">{craft.type}</Badge>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-smooth transform scale-75 group-hover:scale-100"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {craft.duration}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
                  {craft.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <User className="w-4 h-4" />
                  <span>{craft.artisan}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{craft.region}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-3">
                    <span>{craft.views} views</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{craft.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {craft.hasAudio && (
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Volume2 className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    {craft.hasLesson && (
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                        <BookOpen className="w-3 h-3 text-secondary" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Story
                  </Button>
                  {craft.hasLesson && (
                    <Button variant="hero" size="sm" className="flex-1">
                      Start Lesson
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="animate-fade-in">
            Load More Crafts
          </Button>
        </div>
      </div>
      </div>
  );
}
