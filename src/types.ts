export interface Profile {
  name: string;
  role: string;
  university: string;
  major: string;
  bio: string;
  avatarUrl: string;
  avatarUrls: string[];
  location: string;
  period: string;
  companyName: string;
  department: string;
  githubUrl: string;
  whatsappNumber: string;
  email: string;
  linkedinUrl: string;
  skills?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  date: string;
}
