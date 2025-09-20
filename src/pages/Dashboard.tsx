import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Heart, Share2, FileText, Edit, Trash2, Upload, Bell } from 'lucide-react';
import StatsCard from '../components/analytics/StatsCard';
import EngagementChart from '../components/analytics/EngagementChart';
import { getDrafts, getPublishedCrafts, deleteDraft, publishDraft } from '../utils/storage';
import { mockEngagementStats } from '../utils/mockData';
import { Craft } from '../types/craft';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [drafts, setDrafts] = useState<Craft[]>(getDrafts());
  const [published] = useState<Craft[]>(getPublishedCrafts());
  
  const stats = mockEngagementStats;
  
  const notifications = [
    { id: 1, message: "10 new likes on Silk Saree", time: "2 hours ago", type: "like" },
    { id: 2, message: "5 new shares on Madhubani Painting", time: "4 hours ago", type: "share" },
    { id: 3, message: "New comment on Blue Pottery", time: "6 hours ago", type: "comment" },
  ];

  const handleDeleteDraft = (id: string) => {
    deleteDraft(id);
    setDrafts(getDrafts());
    toast.success('Draft deleted successfully');
  };

  const handlePublishDraft = (id: string) => {
    const publishedCraft = publishDraft(id);
    if (publishedCraft) {
      setDrafts(getDrafts());
      toast.success('Draft published successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600">Welcome back, Kamala Devi</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title={t('dashboard.totalViews')}
            value={stats.totalViews.toLocaleString()}
            icon={Eye}
            color="orange"
            change="+12% from last week"
          />
          <StatsCard
            title={t('dashboard.totalLikes')}
            value={stats.totalLikes}
            icon={Heart}
            color="blue"
            change="+8% from last week"
          />
          <StatsCard
            title={t('dashboard.totalShares')}
            value={stats.totalShares}
            icon={Share2}
            color="green"
            change="+15% from last week"
          />
          <StatsCard
            title={t('dashboard.drafts')}
            value={drafts.length}
            icon={FileText}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Engagement Chart */}
          <div className="lg:col-span-2">
            <EngagementChart
              data={stats.weeklyViews}
              title={t('dashboard.engagementChart')}
            />
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('dashboard.recentActivity')}
            </h3>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Bell className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Most Viewed Craft */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.mostViewed')}
          </h3>
          <div className="flex items-center space-x-4">
            <img
              src={stats.topCraft.imageUrl}
              alt={stats.topCraft.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{stats.topCraft.title}</h4>
              <p className="text-gray-600 text-sm">{stats.topCraft.views} views this week</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center text-sm text-gray-500">
                  <Heart className="w-4 h-4 mr-1" />
                  {stats.topCraft.likes}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <Share2 className="w-4 h-4 mr-1" />
                  {stats.topCraft.shares}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Draft Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.manageDrafts')}
          </h3>
          {drafts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {t('dashboard.noDrafts')}
            </p>
          ) : (
            <div className="space-y-4">
              {drafts.map(draft => (
                <div key={draft.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={draft.imageUrl || 'https://images.pexels.com/photos/8969287/pexels-photo-8969287.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={draft.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{draft.title}</h4>
                      <p className="text-sm text-gray-600">{draft.region} • {draft.category}</p>
                      <p className="text-xs text-gray-500">
                        Saved {draft.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePublishDraft(draft.id)}
                      className="flex items-center px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      {t('dashboard.publish')}
                    </button>
                    <button className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm">
                      <Edit className="w-4 h-4 mr-1" />
                      {t('dashboard.edit')}
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {t('dashboard.delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Published Crafts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.published')} ({published.length})
          </h3>
          {published.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {t('dashboard.noPublished')}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {published.map(craft => (
                <div key={craft.id} className="border border-gray-200 rounded-lg p-4">
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-gray-900 mb-2">{craft.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {craft.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {craft.likes}
                      </span>
                    </div>
                    <span>{craft.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;