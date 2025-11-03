import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Award,
  Users,
  TrendingUp,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

import { AppNavbar } from "@/components/ui/app-navbar";

export default function Lessons() {
  return (
    <>
      <AppNavbar />
      <LessonsContent />
    </>
  );
}

function LessonsContent() {
  const lessons = [
    {
      id: 1,
      title: "Fundamentals of Pottery Wheel",
      instructor: "Master Kenji",
      duration: "2.5 hours",
      difficulty: "Beginner",
      rating: 4.9,
      students: 1250,
      progress: 0,
      completed: false,
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=200&fit=crop",
      category: "Pottery",
      lessons: 8,
      description: "Learn the ancient art of pottery making from centering clay to creating your first bowl."
    },
    {
      id: 2,
      title: "Traditional Weaving Patterns",
      instructor: "Maria Textile",
      duration: "3 hours",
      difficulty: "Intermediate",
      rating: 4.8,
      students: 890,
      progress: 65,
      completed: false,
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&h=200&fit=crop",
      category: "Textile",
      lessons: 12,
      description: "Master traditional weaving techniques and create intricate patterns passed down through generations."
    },
    {
      id: 3,
      title: "Block Printing Mastery",
      instructor: "Ravi Craftsman",
      duration: "1.8 hours",
      difficulty: "Beginner",
      rating: 4.7,
      students: 675,
      progress: 100,
      completed: true,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
      category: "Printing",
      lessons: 6,
      description: "Discover the art of hand block printing and create beautiful textiles using traditional methods."
    },
    {
      id: 4,
      title: "Wood Carving Techniques",
      instructor: "Chief Kwame",
      duration: "4 hours",
      difficulty: "Advanced",
      rating: 4.9,
      students: 432,
      progress: 30,
      completed: false,
      image: "https://images.unsplash.com/photo-1616547771554-6a3c4c5fad6d?w=400&h=200&fit=crop",
      category: "Carving",
      lessons: 15,
      description: "Advanced wood carving techniques for creating intricate sculptures and decorative pieces."
    },
    {
      id: 5,
      title: "Ceramic Glazing Workshop",
      instructor: "Isabella Artist",
      duration: "2 hours",
      difficulty: "Intermediate",
      rating: 4.6,
      students: 723,
      progress: 0,
      completed: false,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=200&fit=crop",
      category: "Ceramics",
      lessons: 9,
      description: "Learn traditional glazing techniques to bring your ceramic pieces to life with color and texture."
    },
    {
      id: 6,
      title: "Nordic Knitting Patterns",
      instructor: "Astrid Wool",
      duration: "3.5 hours",
      difficulty: "Intermediate",
      rating: 4.8,
      students: 956,
      progress: 85,
      completed: false,
      image: "https://images.unsplash.com/photo-1559395338-b5e6ead3442a?w=400&h=200&fit=crop",
      category: "Knitting",
      lessons: 11,
      description: "Create beautiful Nordic-inspired knitting patterns with traditional colorwork techniques."
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "success";
      case "Intermediate": return "secondary";
      case "Advanced": return "destructive";
      default: return "outline";
    }
  };

  const inProgressLessons = lessons.filter(lesson => lesson.progress > 0 && !lesson.completed);
  const availableLessons = lessons.filter(lesson => lesson.progress === 0);
  const completedLessons = lessons.filter(lesson => lesson.completed);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Craft Lessons
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Learn traditional crafts from master artisans through interactive lessons and hands-on projects
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Search Lessons</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by craft, instructor, or topic..."
                  className="pl-10 transition-smooth focus:shadow-soft"
                />
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        {inProgressLessons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inProgressLessons.map((lesson, index) => (
                <Card 
                  key={lesson.id} 
                  className="hover:scale-105 transition-bounce shadow-soft hover:shadow-large animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex">
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="w-32 h-full object-cover rounded-l-lg"
                    />
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{lesson.title}</h3>
                        <Badge variant={getDifficultyColor(lesson.difficulty) as any}>
                          {lesson.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        by {lesson.instructor}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{lesson.progress}%</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                      </div>
                      <Button variant="hero" size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Lesson
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            All Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <Card 
                key={lesson.id} 
                className={`group hover:scale-105 transition-bounce cursor-pointer shadow-soft hover:shadow-large animate-fade-in ${
                  lesson.completed ? "ring-2 ring-success/20" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-smooth"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary">{lesson.category}</Badge>
                    {lesson.completed && (
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>

                  {/* Play Button */}
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
                    {lesson.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
                      {lesson.title}
                    </h3>
                    <Badge variant={getDifficultyColor(lesson.difficulty) as any} className="ml-2">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    by {lesson.instructor}
                  </p>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{lesson.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{lesson.students}</span>
                      </div>
                    </div>
                    <span>{lesson.lessons} lessons</span>
                  </div>

                  {/* Progress Bar for In-Progress Lessons */}
                  {lesson.progress > 0 && !lesson.completed && (
                    <div className="mb-4">
                      <Progress value={lesson.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {lesson.progress}% complete
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    variant={lesson.progress > 0 ? "hero" : "outline"} 
                    className="w-full"
                  >
                    {lesson.completed ? (
                      <>
                        <Award className="w-4 h-4 mr-2" />
                        Review
                      </>
                    ) : lesson.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Learning
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        {completedLessons.length > 0 && (
          <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl p-6 text-center animate-fade-in">
            <Award className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-muted-foreground mb-4">
              You've completed {completedLessons.length} lesson{completedLessons.length > 1 ? 's' : ''}. 
              Keep learning to unlock more achievements!
            </p>
            <Button variant="success">
              View Certificates
            </Button>
          </div>
        )}
      </div>
      </div>
  );
}
