import { Injectable } from '@angular/core';
import { IProject } from '../models/project.interface';
import { ALL_PROJECT_DATA } from '../data/projects.data';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  getProjects(): IProject[] {
    return ALL_PROJECT_DATA;
  }

  getFeaturedProjects(): IProject[] {
    return ALL_PROJECT_DATA.filter(p => p.isFeatured);
  }

  getProjectById(id: string): IProject | undefined {
    return ALL_PROJECT_DATA.find(p => p.id === id);
  }

  getProjectsByTags(tags: string[]): IProject[] {
    if (!tags.length) return ALL_PROJECT_DATA;
    return ALL_PROJECT_DATA.filter(project => 
      project.tags?.some(tag => tags.includes(tag))
    );
  }
}