import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import CraftCard from '../components/common/CraftCard';
import StoryModal from '../components/explorer/StoryModal';
import { mockCrafts, categories, regions } from '../utils/mockData';
import { getPublishedCrafts } from '../utils/storage';
import { Craft } from '../types/craft';

const Explorer: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);
  
  // Combine mock data with local storage data
  const allCrafts = useMemo(() => {
    const published = getPublishedCrafts();
    return [...mockCrafts, ...published];
  }, []);

  const filteredCrafts = useMemo(() => {
    return allCrafts.filter(craft => {
      const matchesSearch = !searchQuery || 
        craft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        craft.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        craft.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        craft.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        craft.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || craft.category === selectedCategory;
      const matchesRegion = !selectedRegion || craft.region === selectedRegion;
      
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [allCrafts, searchQuery, selectedCategory, selectedRegion]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {t('explorer.title')}
          </h1>
          
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            
            <div className="flex space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCrafts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('explorer.noResults')}
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrafts.map(craft => (
              <CraftCard
                key={craft.id}
                craft={craft}
                onViewStory={setSelectedCraft}
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedCraft && (
        <StoryModal
          craft={selectedCraft}
          onClose={() => setSelectedCraft(null)}
        />
      )}
    </div>
  );
};

export default Explorer;