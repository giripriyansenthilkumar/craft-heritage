import React from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Compass, Palette, Globe, Users, Award } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Palette,
      title: t('landing.feature1Title'),
      description: t('landing.feature1Desc'),
    },
    {
      icon: Globe,
      title: t('landing.feature2Title'),
      description: t('landing.feature2Desc'),
    },
    {
      icon: Award,
      title: t('landing.feature3Title'),
      description: t('landing.feature3Desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-orange-600">{t('landing.title')}</span>
              <br />
              <span className="text-2xl lg:text-4xl text-gray-700 font-medium">
                {t('landing.subtitle')}
              </span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-lg lg:text-xl text-gray-600 mb-12 leading-relaxed">
              {t('landing.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => onNavigate('upload')}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                {t('landing.forArtisans')}
              </button>
              
              <button
                onClick={() => onNavigate('explorer')}
                className="w-full sm:w-auto bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-lg hover:bg-orange-50 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Compass className="w-5 h-5 mr-2" />
                {t('landing.forUsers')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.featuresTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-orange-50 transition-colors duration-200 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">500+</span>
              </div>
              <p className="text-orange-100">Artisans Connected</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Palette className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">1000+</span>
              </div>
              <p className="text-orange-100">Crafts Showcased</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">50+</span>
              </div>
              <p className="text-orange-100">Regions Covered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;