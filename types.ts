export interface AppLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string; // Key for the icon mapping
}

export type IconKey = string;

export interface User {
  name: string;
  initials: string;
  role: 'admin' | 'guest';
}