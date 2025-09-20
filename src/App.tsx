import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Landing from './pages/Landing';
import ArtisanUpload from './pages/ArtisanUpload';
import Explorer from './pages/Explorer';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import './i18n';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Landing onNavigate={setCurrentPage} />;
      case 'upload':
        return <ArtisanUpload />;
      case 'explorer':
        return <Explorer />;
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;