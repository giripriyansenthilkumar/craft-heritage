export interface Craft {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  region: string;
  category: string;
  artisanName: string;
  story?: string;
  audioUrl?: string;
  tags: string[];
  views: number;
  likes: number;
  shares: number;
  comments: number;
  createdAt: Date;
  isDraft: boolean;
}

export interface Artisan {
  id: string;
  name: string;
  region: string;
  crafts: Craft[];
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  joinedAt: Date;
}

export interface EngagementStats {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  weeklyViews: number[];
  topCraft: Craft;
}