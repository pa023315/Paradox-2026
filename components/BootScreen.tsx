import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const sequence = [
      "INITIALIZING KERNEL...",
      "LOADING NEURAL INTERFACE...",
      "SCANNING TIMELINES...",
      "DECRYPTING SECURE CHANNELS...",
      "SYSTEM READY."
    ];

    let delay = 0;
    sequence.forEach((line, index) => {
      delay += Math.random() * 800 + 400;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === sequence.length - 1) {
          setTimeout(() => setShowButton(true), 500);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-cyber-bg flex flex-col items-center justify-center font-mono text-cyber-green">
      <div className="w-full max-w-lg p-8">
        {lines.map((line, i) => (
          <div key={i} className="mb-2 text-lg md:text-xl typing-effect">
            {`> ${line}`}
          </div>
        ))}
        <div className="h-8" /> 
        {showButton && (
          <button
            onClick={onComplete}
            className="group relative px-8 py-3 bg-transparent border border-cyber-green text-cyber-green font-bold text-xl uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-all duration-200 animate-pulse"
          >
            <span className="absolute -inset-1 bg-cyber-green opacity-30 blur group-hover:opacity-60 transition-opacity"></span>
            [ CONNECT SIGNAL ]
          </button>
        )}
      </div>
    </div>
  );
};

export default BootScreen;