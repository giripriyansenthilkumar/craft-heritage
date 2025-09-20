import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Compass, BarChart3, TrendingUp, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { t } = useTranslation();

  const navItems = [
    { key: 'home', icon: Home, label: t('nav.home') },
    { key: 'explorer', icon: Compass, label: t('nav.explorer') },
    { key: 'dashboard', icon: BarChart3, label: t('nav.dashboard') },
    { key: 'analytics', icon: TrendingUp, label: t('nav.analytics') },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600">
                ArtConnect AI
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navItems.map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => onNavigate(key)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentPage === key
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                currentPage === key
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;