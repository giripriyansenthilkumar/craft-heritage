import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, Target, Lightbulb } from 'lucide-react';
import StatsCard from '../components/analytics/StatsCard';
import EngagementChart from '../components/analytics/EngagementChart';
import { mockEngagementStats, mockCrafts } from '../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const stats = mockEngagementStats;

  const craftPerformanceData = mockCrafts.map(craft => ({
    name: craft.title.split(' ').slice(0, 2).join(' '),
    views: craft.views,
    likes: craft.likes,
    shares: craft.shares,
  }));

  const insights = [
    {
      title: "Peak Engagement Time",
      description: "Your crafts receive most views between 6-9 PM",
      icon: TrendingUp,
      color: "orange" as const,
    },
    {
      title: "Popular Category",
      description: "Textiles generate 40% more engagement than other categories",
      icon: Target,
      color: "blue" as const,
    },
    {
      title: "Audience Growth",
      description: "25% increase in followers this month",
      icon: Users,
      color: "green" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('analytics.title')}
          </h1>
          <p className="text-gray-600">Insights and performance metrics for your crafts</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Engagement"
            value={(stats.totalViews + stats.totalLikes + stats.totalShares).toLocaleString()}
            icon={TrendingUp}
            color="orange"
            change="+18% from last month"
          />
          <StatsCard
            title="Avg. Views per Craft"
            value={Math.round(stats.totalViews / 3)}
            icon={TrendingUp}
            color="blue"
            change="+12% from last month"
          />
          <StatsCard
            title="Engagement Rate"
            value="8.4%"
            icon={Target}
            color="green"
            change="+2.1% from last month"
          />
          <StatsCard
            title="Active Followers"
            value="1.2K"
            icon={Users}
            color="purple"
            change="+156 this month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Trend */}
          <EngagementChart
            data={stats.weeklyViews}
            title={t('analytics.weeklyTrend')}
          />

          {/* Craft Performance */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('analytics.craftPerformance')}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={craftPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#f97316" />
                <Bar dataKey="likes" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('analytics.insights')}
              </h3>
              <p className="text-gray-600">
                {t('analytics.topInsight')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className={`p-2 rounded-full w-fit mb-3 ${
                  insight.color === 'orange' ? 'bg-orange-100' :
                  insight.color === 'blue' ? 'bg-blue-100' :
                  insight.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <insight.icon className={`w-5 h-5 ${
                    insight.color === 'orange' ? 'text-orange-600' :
                    insight.color === 'blue' ? 'text-blue-600' :
                    insight.color === 'green' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performing Crafts This Month
          </h3>
          <div className="space-y-4">
            {mockCrafts
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((craft, index) => (
                <div key={craft.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{craft.title}</h4>
                    <p className="text-sm text-gray-600">{craft.region} • {craft.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{craft.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">views</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;