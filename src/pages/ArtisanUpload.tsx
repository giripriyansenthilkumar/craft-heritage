import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Image, Play, Download, Save, Share2 } from 'lucide-react';
import { saveDraft, publishCraft } from '../utils/storage';
import { regions, categories } from '../utils/mockData';
import toast from 'react-hot-toast';

const ArtisanUpload: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    region: '',
    category: '',
    artisanName: 'Kamala Devi', // Default artisan name
    imageUrl: '',
    tags: [] as string[],
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!formData.title || !formData.description || !formData.region || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const craftData = {
      ...formData,
      imageUrl: imagePreview || 'https://images.pexels.com/photos/8969287/pexels-photo-8969287.jpeg?auto=compress&cs=tinysrgb&w=800',
    };

    if (isDraft) {
      saveDraft(craftData);
      toast.success(t('upload.success'));
    } else {
      publishCraft(craftData);
      toast.success(t('upload.published'));
      setPreviewMode(true);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      region: '',
      category: '',
      artisanName: 'Kamala Devi',
      imageUrl: '',
      tags: [],
    });
    setImagePreview('');
  };

  const mockAIStory = `This ${formData.title || 'beautiful craft'} represents the rich cultural heritage of ${formData.region || 'India'}. Crafted with dedication and traditional techniques passed down through generations, this piece tells a story of artisan mastery and cultural preservation. Each detail reflects the deep connection between the artisan and their craft, embodying centuries of tradition and artistic excellence.`;

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setPreviewMode(false)}
            className="mb-6 text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Upload
          </button>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={imagePreview || 'https://images.pexels.com/photos/8969287/pexels-photo-8969287.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Craft preview"
                  className="w-full h-96 object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('upload.preview')}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('upload.aiStory')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {mockAIStory}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t('upload.audioStory')}
                    </h4>
                    <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
                      <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <div className="flex-1 h-2 bg-gray-300 rounded">
                        <div className="w-1/3 h-full bg-orange-500 rounded"></div>
                      </div>
                      <span className="text-sm text-gray-600">2:34</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      {t('upload.downloadPdf')}
                    </button>
                    
                    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('upload.title')}
          </h1>
          
          <form className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('upload.imageUpload')} *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-48 mx-auto object-cover rounded-lg"
                  />
                ) : (
                  <div>
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('upload.craftTitle')} *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Handwoven Silk Saree"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('upload.craftDescription')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tell the story of your craft..."
              />
            </div>

            {/* Region and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('upload.region')} *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">{t('upload.selectRegion')}</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('upload.category')} *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">{t('upload.selectCategory')}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium flex items-center justify-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                {t('upload.publish')}
              </button>
              
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                {t('upload.saveDraft')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtisanUpload;