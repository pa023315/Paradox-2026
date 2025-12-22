import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';
import { ASCII_ART } from '../utils/mockData';

interface TerminalProps {
  onLogin: (id: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onLogin }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 'init', type: 'system', content: ASCII_ART },
    { id: 'welcome', type: 'system', content: 'Welcome, Observer. Enter command or identification.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const newHistory = [...history, { id: Date.now().toString(), type: 'input' as const, content: `> ${cmd}` }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    const lowerCmd = trimmed.toLowerCase();

    // Logic
    if (lowerCmd === 'clear') {
      setHistory([]);
      return;
    } else if (lowerCmd === 'help') {
      newHistory.push({ id: Date.now() + 'r', type: 'output', content: 'COMMANDS: HELP, CLEAR, STATUS, [EMAIL]' });
    } else if (lowerCmd === 'hello') {
      newHistory.push({ id: Date.now() + 'r', type: 'output', content: 'Hello, World. The void stares back.' });
    } else if (lowerCmd === 'glitch') {
      newHistory.push({ id: Date.now() + 'r', type: 'output', content: 'H̴E̴L̴P̴ ̴M̴E̴ ̴I̴\'̴M̴ ̴T̴R̴A̴P̴P̴E̴D̴' });
    } else if (lowerCmd === 'status') {
      newHistory.push({ id: Date.now() + 'r', type: 'output', content: 'SYSTEM STATUS: OPTIMAL. REALITY ANCHOR: STABLE.' });
    } else if (trimmed.includes('@')) {
      // Fake Login
      const id = `RSCH-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
      newHistory.push({ id: Date.now() + 'r', type: 'system', content: `Identity Verified. Welcome, Researcher ${id}.` });
      newHistory.push({ id: Date.now() + 'r2', type: 'system', content: `Accessing Restricted Archives... Access Granted.` });
      onLogin(id);
    } else {
      newHistory.push({ id: Date.now() + 'r', type: 'output', content: `Command not found: ${trimmed}` });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-8 overflow-hidden font-mono text-sm md:text-base">
      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        {history.map((line) => (
          <div 
            key={line.id} 
            className={`whitespace-pre-wrap ${
              line.type === 'input' ? 'text-white' : 
              line.type === 'system' ? 'text-cyber-green' : 
              'text-cyber-blue'
            }`}
          >
            {line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-4 flex items-center border-t border-cyber-dim pt-4">
        <span className="text-cyber-green mr-2">{'>'}</span>
        <input
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;