import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Play, Heart, MessageCircle, Share2, MapPin, User } from 'lucide-react';
import { Craft } from '../../types/craft';

interface StoryModalProps {
  craft: Craft;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ craft, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{craft.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={craft.imageUrl}
                alt={craft.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-6">
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-medium text-orange-600">{craft.artisanName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{craft.region}</span>
                  <span className="mx-2">•</span>
                  <span>{craft.category}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  AI-Generated Story
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {craft.story}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {t('modal.listenStory')}
                </h4>
                <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                  <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
                    <Play className="w-5 h-5" />
                  </button>
                  <div className="flex-1 h-2 bg-gray-300 rounded">
                    <div className="w-1/4 h-full bg-orange-500 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">3:45</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-6">
                  <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>{craft.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span>{craft.comments}</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5 mr-2" />
                    <span>{craft.shares}</span>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {craft.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;