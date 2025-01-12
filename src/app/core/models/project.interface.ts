export interface IProject {
  id: string;
  name: string;
  description: string;
  isFeatured?: boolean;
  projectLink: string;
  liveUrl?: string;
  features?: string[];
  tags: string[];
  techStuff: string[];
  additionalData?: { 
    title: string; 
    data: string[];
  }[];
}