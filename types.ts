export enum View {
  TERMINAL = 'TERMINAL',
  STAR_MAP = 'STAR_MAP',
  SYSTEM_LOGS = 'SYSTEM_LOGS',
  RESEARCHER = 'RESEARCHER',
  MONITOR = 'MONITOR'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SYSTEM';
  message: string;
}

export interface StarNode {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  name: string;
  status: 'active' | 'dormant' | 'unstable';
  desc: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
}