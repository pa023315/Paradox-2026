import { LogEntry, StarNode } from '../types';

export const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '22:42:01', level: 'SYSTEM', message: 'Connection established to Sector 7.' },
  { id: '2', timestamp: '22:42:05', level: 'INFO', message: 'Scanning for quantum fluctuations...' },
  { id: '3', timestamp: '22:42:12', level: 'WARN', message: 'Anomaly detected in Timeline B.' },
  { id: '4', timestamp: '22:42:18', level: 'INFO', message: 'Synchronizing local cache.' },
  { id: '5', timestamp: '22:42:25', level: 'SYSTEM', message: 'Firewall updated. v4.0.2' },
];

export const MOCK_STARS: StarNode[] = [
  { id: 'n1', x: 20, y: 30, name: 'Alpha-Prime', status: 'active', desc: 'Primary broadcast node.' },
  { id: 'n2', x: 75, y: 25, name: 'Beta-Glitch', status: 'unstable', desc: 'High variance detected.' },
  { id: 'n3', x: 50, y: 60, name: 'Gamma-Void', status: 'dormant', desc: 'No signal for 400 cycles.' },
  { id: 'n4', x: 85, y: 75, name: 'Delta-Echo', status: 'active', desc: 'Rebroadcasting ancient signals.' },
  { id: 'n5', x: 15, y: 80, name: 'Epsilon-Root', status: 'active', desc: 'Core infrastructure.' },
];

export const ASCII_ART = `
  _____                 _____           _            
 |  __ \\               |  __ \\         | |           
 | |__) |_ _ _ __ __ _ | |  | | _____  | |           
 |  ___/ _\` | '__/ _\` || |  | |/ _ \\ \\/ /           
 | |  | (_| | | | (_| || |__| | (_) >  <            
 |_|   \\__,_|_|  \\__,_||_____/ \\___/_/\\_\\           
                                                     
 VTUBER OBSERVATION TERMINAL v2.0.4
`;