import React, { useEffect, useState, useRef } from 'react';
import { LogEntry } from '../types';
import { MOCK_LOGS } from '../utils/mockData';

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate initial data fetch
    const initialData = [...MOCK_LOGS];
    setLogs(initialData);

    // Simulate streaming logs
    const interval = setInterval(() => {
      const msgs = [
        "Packet intercepted from Sector 9.",
        "Decrypting stream...",
        "Heartbeat detected.",
        "Warning: Memory leak in sector 4.",
        "Re-routing power to shields.",
        "Ping: 12ms",
        "User unauthorized attempt detected."
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      const levels: LogEntry['level'][] = ['INFO', 'WARN', 'SYSTEM'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: randomLevel,
        message: randomMsg
      };

      setLogs(prev => [...prev.slice(-19), newLog]); // Keep last 20
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-full w-full p-4 md:p-8 flex flex-col font-mono text-sm">
      <div className="mb-4 flex items-center justify-between border-b border-cyber-dim pb-2">
        <h2 className="text-xl text-cyber-purple font-bold">SYSTEM LOGS</h2>
        <span className="text-xs animate-pulse text-green-500">● LIVE FEED</span>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-1 pr-2"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 border-l border-cyber-dim pl-2 hover:bg-white/5 transition-colors p-1">
            <span className="text-gray-500 w-20 flex-shrink-0 text-xs">{log.timestamp}</span>
            <span className={`w-16 flex-shrink-0 font-bold text-xs ${
              log.level === 'WARN' ? 'text-orange-500' :
              log.level === 'ERROR' ? 'text-red-500' :
              log.level === 'SYSTEM' ? 'text-cyber-green' :
              'text-cyber-blue'
            }`}>
              [{log.level}]
            </span>
            <span className="text-gray-300 break-all">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;