import React, { useState, useEffect } from 'react';
import CRTOverlay from './components/CRTOverlay';
import BootScreen from './components/BootScreen';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import StarMap from './components/StarMap';
import SystemLogs from './components/SystemLogs';
import { View } from './types';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.TERMINAL);
  const [researcherId, setResearcherId] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for persistent session
    const savedId = localStorage.getItem('PARA_DOX_ID');
    if (savedId) {
      setResearcherId(savedId);
    }
  }, []);

  const handleLogin = (id: string) => {
    setResearcherId(id);
    localStorage.setItem('PARA_DOX_ID', id);
  };

  return (
    <div className="relative w-full h-screen bg-cyber-bg text-cyber-blue font-mono overflow-hidden flex flex-col md:flex-row">
      <CRTOverlay />
      
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        researcherId={researcherId}
      />

      <main className="flex-1 relative overflow-hidden bg-cyber-bg/50 z-10">
        {currentView === View.TERMINAL && (
          <Terminal onLogin={handleLogin} />
        )}
        
        {currentView === View.STAR_MAP && (
          <StarMap />
        )}

        {currentView === View.SYSTEM_LOGS && (
          <SystemLogs />
        )}

        {currentView === View.RESEARCHER && (
          <div className="h-full w-full flex items-center justify-center p-8 text-center flex-col">
            <h2 className="text-3xl text-cyber-green mb-4 glitch-text">ACCESS GRANTED</h2>
            <div className="border border-cyber-green p-6 max-w-md bg-black/50 backdrop-blur">
              <p className="mb-4">RESEARCHER PROFILE: <span className="text-white font-bold">{researcherId}</span></p>
              <p className="text-sm text-gray-400">Clearance Level: 4 (Omni)</p>
              <p className="text-sm text-gray-400 mt-2">
                "The timelines are converging. Maintain observation protocols."
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Decorative Corner overlay */}
      <div className="absolute top-0 right-0 p-4 pointer-events-none z-20 opacity-50 hidden md:block">
         <div className="w-20 h-20 border-t-2 border-r-2 border-cyber-purple"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 pointer-events-none z-20 opacity-50 hidden md:block">
         <div className="w-20 h-20 border-b-2 border-l-2 border-cyber-purple"></div>
      </div>
    </div>
  );
};

export default App;