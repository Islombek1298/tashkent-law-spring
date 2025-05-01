// Speaker Type
export interface Speaker {
  id: string;
  name: string;
  position: string;
  photo: string;
  bio?: string;
  tags: string[];
  role: string;
  social: {
    type: 'linkedin' | 'twitter' | 'instagram' | string;
    url: string;
  }[];
  featured: boolean;
  sessions: string[]; // References to session IDs
}

// Session Type
export interface Session {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  tag: string;
  category: string;
  speakers: string[]; // References to speaker IDs
}

// User Type (for Admin)
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  lastLogin: Date;
}

// Event Type
export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  address: string;
  theme: string;
  statistics: {
    countries: number;
    speakers: number;
    participants: number;
    sessions: number;
  };
}

// Media Type
export interface Media {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  title?: string;
  year: number;
  featured: boolean;
}
