import React, { useState, useEffect } from 'react';
import { StarNode } from '../types';
import { MOCK_STARS } from '../utils/mockData';

const StarMap: React.FC = () => {
  const [stars, setStars] = useState<StarNode[]>([]);
  const [hovered, setHovered] = useState<StarNode | null>(null);

  // Mock Fetch
  useEffect(() => {
    // In a real app, we'd fetch from API_URL here.
    // Fallback to mock immediately for this demo.
    setStars(MOCK_STARS);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050508] overflow-hidden">
        {/* Background Grid */}
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute group cursor-pointer"
          style={{ top: `${star.y}%`, left: `${star.x}%` }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Node Visual */}
          <div className={`
            w-4 h-4 rounded-full border-2 transition-all duration-300 relative
            ${star.status === 'active' ? 'bg-cyber-blue border-white shadow-[0_0_15px_#00f3ff]' : 
              star.status === 'unstable' ? 'bg-red-500 border-red-200 animate-pulse' : 
              'bg-gray-700 border-gray-500'}
          `}>
             <div className="absolute -inset-2 rounded-full border border-current opacity-0 group-hover:opacity-50 group-hover:scale-150 transition-all duration-500" />
          </div>

          {/* Label */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-60 whitespace-nowrap pointer-events-none">
            {star.name}
          </div>
        </div>
      ))}

      {/* Tooltip Panel */}
      {hovered && (
        <div className="absolute bottom-8 right-8 w-64 p-4 border border-cyber-blue bg-black/90 backdrop-blur text-sm z-30 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
          <h3 className="font-bold text-cyber-blue mb-1">{hovered.name}</h3>
          <div className="text-xs text-gray-400 mb-2">STATUS: <span className={hovered.status === 'active' ? 'text-green-400' : 'text-red-400'}>{hovered.status.toUpperCase()}</span></div>
          <p className="text-gray-300">{hovered.desc}</p>
        </div>
      )}
    </div>
  );
};

export default StarMap;