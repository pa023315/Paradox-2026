import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import StarMap from './components/StarMap';
import SystemLogs from './components/SystemLogs';
import SyncMonitor from './components/SyncMonitor';
import BootScreen from './components/BootScreen';
import { View } from './types';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.TERMINAL);
  const [researcherId, setResearcherId] = useState<string | null>(null);

  useEffect(() => {
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
    <div className="flex flex-col md:flex-row h-screen w-screen bg-cyber-bg text-cyber-blue overflow-hidden relative font-mono">
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        researcherId={researcherId}
      />

      <main className="flex-1 relative overflow-hidden z-10 bg-black/20">
        {currentView === View.TERMINAL && (
          <Terminal onLogin={handleLogin} />
        )}
        
        {currentView === View.STAR_MAP && (
          <StarMap />
        )}

        {currentView === View.MONITOR && (
          <SyncMonitor />
        )}

        {currentView === View.SYSTEM_LOGS && (
          <SystemLogs />
        )}

        {currentView === View.RESEARCHER && (
          <div className="h-full w-full flex items-center justify-center p-8 text-center flex-col animate-in fade-in duration-700">
            <h2 className="text-4xl text-cyber-green mb-6 font-bold tracking-tighter glitch-text" data-text="ACCESS GRANTED">ACCESS GRANTED</h2>
            <div className="border border-cyber-green p-8 max-w-md bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(57,255,20,0.2)]">
              <p className="text-xl mb-4 font-bold text-white uppercase tracking-widest">
                ID: <span className="text-cyber-green">{researcherId}</span>
              </p>
              <div className="h-px bg-cyber-green/30 w-full my-4"></div>
              <p className="text-sm text-gray-400 font-mono">
                CLEARANCE LEVEL: 04 // OMNI-ACCESS
              </p>
              <p className="text-xs text-cyber-purple mt-6 italic opacity-80">
                "The singularity is approaching. All observation streams must remain active."
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Decorative Overlays */}
      <div className="absolute top-0 right-0 p-6 pointer-events-none z-20 opacity-30 hidden md:block">
         <div className="w-24 h-24 border-t-2 border-r-2 border-cyber-purple"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-6 pointer-events-none z-20 opacity-30 hidden md:block">
         <div className="w-24 h-24 border-b-2 border-l-2 border-cyber-purple"></div>
      </div>
    </div>
  );
};

export default App;