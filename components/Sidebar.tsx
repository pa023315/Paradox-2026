import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  researcherId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, researcherId }) => {
  const navItems = [
    { id: View.TERMINAL, label: 'TERMINAL', icon: '>' },
    { id: View.STAR_MAP, label: 'STAR MAP', icon: '*' },
    { id: View.SYSTEM_LOGS, label: 'SYSTEM LOGS', icon: '#' },
  ];

  if (researcherId) {
    navItems.push({ id: View.RESEARCHER, label: `ID: ${researcherId}`, icon: '@' });
  }

  return (
    <div className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-cyber-dim bg-cyber-bg/90 flex flex-row md:flex-col p-4 gap-2 overflow-x-auto md:overflow-visible z-20">
      <div className="hidden md:block mb-8 mt-2">
        <h1 className="text-2xl font-bold text-cyber-blue glitch-text" data-text="PARA≠DOX">PARA≠DOX</h1>
        <p className="text-xs text-cyber-purple mt-1 opacity-70">OBSERVATION TERMINAL</p>
      </div>

      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onChangeView(item.id)}
          className={`
            flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wider transition-all duration-200 border-l-2
            ${currentView === item.id 
              ? 'border-cyber-blue text-cyber-bg bg-cyber-blue shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
              : 'border-transparent text-gray-500 hover:text-cyber-blue hover:bg-cyber-blue/10'
            }
          `}
        >
          <span className="opacity-70">{item.icon}</span>
          <span className="whitespace-nowrap">{item.label}</span>
        </button>
      ))}

      <div className="mt-auto hidden md:block text-[10px] text-gray-600 font-mono">
        <p>SYS.VER. 2.0.4</p>
        <p>CONN: SECURE</p>
      </div>
    </div>
  );
};

export default Sidebar;