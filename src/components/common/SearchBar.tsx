import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Mic } from 'lucide-react';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    
    // Mock voice search functionality
    setTimeout(() => {
      const mockQueries = [
        'handwoven silk saree',
        'madhubani painting',
        'blue pottery',
        'traditional crafts'
      ];
      const randomQuery = mockQueries[Math.floor(Math.random() * mockQueries.length)];
      setQuery(randomQuery);
      onSearch(randomQuery);
      setIsListening(false);
      toast.success('Voice search completed!');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || t('explorer.searchPlaceholder')}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
        />
        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition-all duration-200 ${
            isListening
              ? 'text-red-500 animate-pulse'
              : 'text-gray-400 hover:text-orange-500'
          }`}
          title={t('explorer.voiceSearch')}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;