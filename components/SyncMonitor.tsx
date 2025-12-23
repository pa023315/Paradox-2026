import React, { useState, useEffect, useRef } from 'react';

const SyncMonitor: React.FC = () => {
  const [time, setTime] = useState({ main: '00:00:00:00', ms: '.000' });
  const [observers, setObservers] = useState(1240);
  const [logs, setLogs] = useState<{ id: number; msg: string; type: string }[]>([]);
  const [anomalies, setAnomalies] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const targetDate = new Date("2026-01-01T00:00:00").getTime();

  useEffect(() => {
    // Timer Logic
    const timerInterval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const ms = diff % 1000;

      setTime({
        main: `${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`,
        ms: `.${String(ms).padStart(3,'0')}`
      });
    }, 47);

    // Observers Logic
    const obsInterval = setInterval(() => {
      setObservers(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 3000);

    // Logs Logic
    const logInterval = setInterval(() => {
      const types = ['INFO', 'WARN', 'CRIT', 'SYNC'];
      const msgs = ['PACKET_RECV', 'QUANT_FLUX', 'NODE_LOCK', 'CORR_SYNC'];
      const newLog = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        msg: msgs[Math.floor(Math.random() * msgs.length)]
      };
      setLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 1500);

    // Radar Anomalies
    const radarInterval = setInterval(() => {
      const newAnomaly = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      };
      setAnomalies(prev => [...prev, newAnomaly]);
      setTimeout(() => {
        setAnomalies(prev => prev.filter(a => a.id !== newAnomaly.id));
      }, 4000);
    }, 4500);

    return () => {
      clearInterval(timerInterval);
      clearInterval(obsInterval);
      clearInterval(logInterval);
      clearInterval(radarInterval);
    };
  }, []);

  return (
    <div className="h-full w-full p-4 md:p-8 grid grid-cols-12 grid-rows-6 gap-4 animate-in fade-in duration-1000">
      {/* Timer Section */}
      <div className="col-span-12 md:col-span-8 row-span-2 border border-cyber-dim bg-black/40 backdrop-blur relative flex flex-col items-center justify-center p-4 overflow-hidden group">
        <div className="absolute top-0 left-0 bg-cyber-blue/20 text-cyber-blue text-[10px] px-2 py-1 font-bold">TIMELINE_COLLAPSE_SEQUENCE // STABLE</div>
        <div className="flex items-baseline justify-center w-full">
          <span className="text-[12vw] md:text-[6rem] font-bold text-cyber-purple drop-shadow-[0_0_20px_rgba(188,19,254,0.5)] tracking-tighter leading-none">
            {time.main}
          </span>
          <span className="text-[4vw] md:text-[2rem] text-cyber-blue opacity-80 ml-2 font-bold">
            {time.ms}
          </span>
        </div>
        {/* Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-blue opacity-40"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-blue opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-blue opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-blue opacity-40"></div>
      </div>

      {/* Observers Section */}
      <div className="col-span-12 md:col-span-4 row-span-2 border border-cyber-dim bg-black/40 backdrop-blur flex flex-col items-center justify-center p-4">
        <div className="absolute top-0 left-0 bg-cyber-green/20 text-cyber-green text-[10px] px-2 py-1 font-bold">ACTIVE_OBSERVERS // LIVE</div>
        <div className="text-5xl md:text-6xl font-bold text-cyber-green drop-shadow-[0_0_15px_rgba(57,255,20,0.3)] animate-pulse">
          {observers.toLocaleString()}
        </div>
        <div className="text-[10px] text-gray-600 mt-2 tracking-widest uppercase">Quantum Node Connections</div>
      </div>

      {/* Radar Section */}
      <div className="col-span-12 md:col-span-6 row-span-4 border border-cyber-dim bg-black/40 backdrop-blur p-4 flex flex-col">
        <div className="text-[10px] text-cyber-blue mb-4 font-bold tracking-widest border-b border-cyber-dim pb-1">QUANTUM_STABILITY_RADAR // SCANNING</div>
        <div className="flex-1 relative flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-cyber-blue/30 relative bg-cyber-blue/5 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-cyber-blue/20"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-cyber-blue/20"></div>
            {/* Radar Sweep */}
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tr from-cyber-blue/40 to-transparent origin-top-left -translate-x-full -translate-y-full rounded-tl-full animate-[spin_4s_linear_infinite]"></div>
            {/* Anomalies */}
            {anomalies.map(a => (
              <div 
                key={a.id} 
                className="absolute w-2 h-2 bg-cyber-red rounded-full shadow-[0_0_10px_#ff3333] animate-ping"
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostics Section */}
      <div className="col-span-12 md:col-span-6 row-span-4 border border-cyber-dim bg-black/40 backdrop-blur p-4 flex flex-col overflow-hidden">
        <div className="text-[10px] text-cyber-purple mb-4 font-bold tracking-widest border-b border-cyber-dim pb-1">ENTROPY_MONITOR_STREAM // HIGH_FREQ</div>
        <div className="flex-1 space-y-2 font-mono text-xs overflow-hidden">
          {logs.map(log => (
            <div key={log.id} className="flex gap-4 animate-in slide-in-from-bottom-2 duration-300">
              <span className="text-gray-600">[{new Date(log.id).toLocaleTimeString()}]</span>
              <span className={`font-bold ${
                log.type === 'CRIT' ? 'text-cyber-red animate-pulse' : 
                log.type === 'WARN' ? 'text-cyber-purple' : 
                'text-cyber-blue'
              }`}>[{log.type}]</span>
              <span className="text-gray-400">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyncMonitor;