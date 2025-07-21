// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import BusOperations from './components/BusOperations';
import TrainOperations from './components/TrainOperations';
import TrackOperations from './components/TrackOperations';
import Chatbot from './components/Chatbot';
import logo from './assets/maingo.png';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} />;
      case 'bus':
        return <BusOperations onNavigate={setActiveView} />;
      case 'train':
        return <TrainOperations onNavigate={setActiveView} />;
      case 'track':
        return <TrackOperations onNavigate={setActiveView} />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative pb-40">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="MainGo Logo" 
                className="h-13 w-auto mr-3"
              />
              <h1 className="text-2xl font-bold">MainGo</h1>
              <span className="ml-3 text-blue-200 text-sm">
                Chicago Transit Authority
              </span>
            </div>
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-blue-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('bus')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'bus'
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-blue-800'
                }`}
              >
                Bus Operations
              </button>
              <button
                onClick={() => setActiveView('train')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'train'
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-blue-800'
                }`}
              >
                Train Operations
              </button>
              <button
                onClick={() => setActiveView('track')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'track'
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-blue-800'
                }`}
              >
                Track Operations
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;