import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  Users,
  Plus,
  Filter,
  Search,
  TrendingUp,
  Globe,
  Camera,
  Video
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { AppNavbar } from "@/components/ui/app-navbar";

export default function Community() {
  return (
    <>
      <AppNavbar />
      <CommunityContent />
    </>
  );
}

function CommunityContent() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

  const posts = [
    {
      id: 1,
      author: {
        name: "Maria Quispe",
        username: "@maria_weaver",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5fc?w=40&h=40&fit=crop&crop=face",
        badge: "Master Artisan",
        verified: true
      },
      content: "Just finished this traditional Andean textile using techniques passed down through five generations! The patterns tell the story of our mountain villages. 🏔️✨",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=500&h=400&fit=crop",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      shares: 12,
      craft: "Textile Weaving",
      region: "Peru"
    },
    {
      id: 2,
      author: {
        name: "Kenji Yamamoto",
        username: "@kenji_potter",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        badge: "Potter Master",
        verified: true
      },
      content: "The meditation of the wheel... Today's creation emerged from 30 years of practice. Each piece carries the spirit of countless hours at the wheel. What speaks to you in this form?",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=400&fit=crop",
      timestamp: "4 hours ago",
      likes: 189,
      comments: 32,
      shares: 8,
      craft: "Pottery",
      region: "Japan"
    },
    {
      id: 3,
      author: {
        name: "Aisha Okonkwo",
        username: "@aisha_crafts",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face",
        badge: "Wood Carver",
        verified: false
      },
      content: "Sharing my journey learning traditional Igbo wood carving! This elephant represents wisdom and strength in our culture. Still learning, but each cut teaches me something new. 🐘",
      image: "https://images.unsplash.com/photo-1616547771554-6a3c4c5fad6d?w=500&h=400&fit=crop",
      timestamp: "6 hours ago",
      likes: 156,
      comments: 28,
      shares: 5,
      craft: "Wood Carving",
      region: "Nigeria"
    },
    {
      id: 4,
      author: {
        name: "Isabella Rodriguez",
        username: "@bella_ceramics",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
        badge: "Ceramic Artist",
        verified: true
      },
      content: "The colors of Talavera come alive in the kiln! 🔥 This piece took 3 weeks from clay to glaze. The blue and yellow represent the sky and sun of beautiful Puebla. Each brushstroke is a prayer.",
      timestamp: "8 hours ago",
      likes: 203,
      comments: 41,
      shares: 15,
      craft: "Ceramics",
      region: "Mexico"
    },
    {
      id: 5,
      author: {
        name: "Ravi Sharma",
        username: "@ravi_prints",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
        badge: "Block Printer",
        verified: false
      },
      content: "Morning ritual: carving a new block for tomorrow's printing session. The wooden block will carry this pattern for generations. Teaching my son the same technique my grandfather taught me. 👨‍👦",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
      timestamp: "12 hours ago",
      likes: 178,
      comments: 23,
      shares: 9,
      craft: "Block Printing",
      region: "India"
    }
  ];

  const trendingTopics = [
    { tag: "#TraditionalPottery", posts: "2.3K" },
    { tag: "#SustainableCrafts", posts: "1.8K" },
    { tag: "#IndigenousArt", posts: "1.5K" },
    { tag: "#HandmadeWithLove", posts: "1.2K" },
    { tag: "#CulturalHeritage", posts: "987" }
  ];

  const suggestedArtisans = [
    {
      name: "Elena Kotsava",
      craft: "Bulgarian Embroidery",
      followers: "2.1K",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Ahmed Hassan",
      craft: "Moroccan Metalwork",
      followers: "1.8K",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Lisa Thompson",
      craft: "Native Beadwork",
      followers: "1.5K",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Connect with artisans and craft enthusiasts from around the world
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="shadow-soft animate-fade-in">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Share your craft journey, ask questions, or celebrate achievements..."
                      className="min-h-[80px] mb-3 resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Video
                        </Button>
                      </div>
                      <Button variant="hero" size="sm">
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="shadow-soft hover:shadow-medium transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author.name}</span>
                          {post.author.verified && (
                            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {post.author.badge}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {post.author.username} • {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 mb-4">
                    <p className="text-foreground leading-relaxed mb-3">
                      {post.content}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{post.craft}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {post.region}
                      </Badge>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-4">
                      <img
                        src={post.image}
                        alt={post.craft}
                        className="w-full max-h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-4">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-3">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                          className={`transition-bounce ${
                            likedPosts.has(post.id) ? "text-red-500" : ""
                          }`}
                        >
                          <Heart 
                            className={`w-4 h-4 mr-2 ${
                              likedPosts.has(post.id) ? "fill-current" : ""
                            }`} 
                          />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(post.id)}
                        className={`${bookmarkedPosts.has(post.id) ? "text-primary" : ""}`}
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${
                            bookmarkedPosts.has(post.id) ? "fill-current" : ""
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          </div>

          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search community..."
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold gradient-text mb-2">12.5K+</div>
                <div className="text-sm text-muted-foreground mb-3">Active Artisans</div>
                <div className="text-lg font-semibold mb-1">89 Countries</div>
                <div className="text-xs text-muted-foreground">Sharing Knowledge</div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Trending
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div 
                      key={topic.tag}
                      className="flex items-center justify-between hover:bg-accent/50 p-2 rounded-lg cursor-pointer transition-smooth animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div>
                        <div className="font-medium text-sm">{topic.tag}</div>
                        <div className="text-xs text-muted-foreground">
                          {topic.posts} posts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Artisans */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Suggested Artisans
                </h3>
                <div className="space-y-3">
                  {suggestedArtisans.map((artisan, index) => (
                    <div 
                      key={artisan.name}
                      className="flex items-center justify-between animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={artisan.avatar} />
                          <AvatarFallback>
                            {artisan.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{artisan.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {artisan.craft}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-3 h-3 mr-1" />
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
  );
}
