import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Heart, MapPin, Calendar } from 'lucide-react';
import { Craft } from '../../types/craft';

interface CraftCardProps {
  craft: Craft;
  onViewStory: (craft: Craft) => void;
}

const CraftCard: React.FC<CraftCardProps> = ({ craft, onViewStory }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img
          src={craft.imageUrl}
          alt={craft.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {craft.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {craft.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {craft.description}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="mr-4">{craft.region}</span>
          <Calendar className="w-3 h-3 mr-1" />
          <span>{craft.createdAt.toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span className="text-orange-600 font-medium">
            {t('explorer.by')} {craft.artisanName}
          </span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{craft.views}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>{craft.likes}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onViewStory(craft)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium"
        >
          {t('explorer.viewStory')}
        </button>
      </div>
    </div>
  );
};

export default CraftCard;