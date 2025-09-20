import { Craft, Artisan, EngagementStats } from '../types/craft';

export const mockCrafts: Craft[] = [
  {
    id: '1',
    title: 'Handwoven Silk Saree',
    description: 'Traditional silk saree woven with golden threads, representing centuries of Varanasi craftsmanship',
    imageUrl: 'https://images.pexels.com/photos/8969287/pexels-photo-8969287.jpeg?auto=compress&cs=tinysrgb&w=800',
    region: 'Varanasi, Uttar Pradesh',
    category: 'Textiles',
    artisanName: 'Kamala Devi',
    story: 'This handwoven silk saree from Varanasi carries centuries of tradition. Each thread tells a story of heritage passed down through generations of skilled weavers. The intricate golden patterns represent the divine beauty of Indian craftsmanship.',
    audioUrl: '/audio/story1.mp3',
    tags: ['silk', 'weaving', 'traditional', 'varanasi'],
    views: 1247,
    likes: 89,
    shares: 23,
    comments: 15,
    createdAt: new Date('2024-01-15'),
    isDraft: false,
  },
  {
    id: '2',
    title: 'Madhubani Painting',
    description: 'Colorful folk art depicting nature and mythology from Bihar',
    imageUrl: 'https://images.pexels.com/photos/6992337/pexels-photo-6992337.jpeg?auto=compress&cs=tinysrgb&w=800',
    region: 'Madhubani, Bihar',
    category: 'Painting',
    artisanName: 'Sunita Kumar',
    story: 'Madhubani painting is a traditional art form from Bihar, where women create vibrant murals using natural pigments. This piece celebrates the harmony between humans and nature, featuring peacocks and lotus flowers.',
    audioUrl: '/audio/story2.mp3',
    tags: ['painting', 'folk-art', 'bihar', 'traditional'],
    views: 892,
    likes: 67,
    shares: 18,
    comments: 12,
    createdAt: new Date('2024-01-10'),
    isDraft: false,
  },
  {
    id: '3',
    title: 'Blue Pottery Bowl',
    description: 'Hand-painted ceramic bowl with traditional Jaipur blue pottery designs',
    imageUrl: 'https://images.pexels.com/photos/6636435/pexels-photo-6636435.jpeg?auto=compress&cs=tinysrgb&w=800',
    region: 'Jaipur, Rajasthan',
    category: 'Pottery',
    artisanName: 'Raj Kumar Sharma',
    story: 'Blue pottery of Jaipur is a unique craft that uses no clay, instead relying on a mixture of quartz, raw glaze, and multani mitti. The distinct blue color comes from cobalt oxide, creating timeless pieces of functional art.',
    audioUrl: '/audio/story3.mp3',
    tags: ['pottery', 'ceramic', 'jaipur', 'blue-pottery'],
    views: 654,
    likes: 45,
    shares: 12,
    comments: 8,
    createdAt: new Date('2024-01-05'),
    isDraft: false,
  }
];

export const mockArtisan: Artisan = {
  id: 'artisan1',
  name: 'Kamala Devi',
  region: 'Varanasi, Uttar Pradesh',
  crafts: mockCrafts.filter(craft => craft.artisanName === 'Kamala Devi'),
  totalViews: 2543,
  totalLikes: 187,
  totalShares: 52,
  joinedAt: new Date('2023-06-15'),
};

export const mockEngagementStats: EngagementStats = {
  totalViews: 2543,
  totalLikes: 187,
  totalShares: 52,
  totalComments: 35,
  weeklyViews: [234, 312, 289, 445, 398, 521, 344],
  topCraft: mockCrafts[0],
};

export const regions = [
  'Varanasi, Uttar Pradesh',
  'Madhubani, Bihar',
  'Jaipur, Rajasthan',
  'Kutch, Gujarat',
  'Thanjavur, Tamil Nadu',
  'Mysore, Karnataka',
  'Kolkata, West Bengal',
  'Chandigarh, Punjab'
];

export const categories = [
  'Textiles',
  'Painting',
  'Pottery',
  'Jewelry',
  'Woodwork',
  'Metalwork',
  'Leather',
  'Embroidery'
];