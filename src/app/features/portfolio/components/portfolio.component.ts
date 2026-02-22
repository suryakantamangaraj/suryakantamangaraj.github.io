import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '@core/services/projects.service';
import { IProject } from '@core/models/project.interface';
import { TAGS_DATA } from '@core/data/tags.data';
import { ITag } from '@core/models/tag.interface';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    standalone: false
})
export class PortfolioComponent implements OnInit {
  projects: IProject[] = [];
  filteredProjects: IProject[] = [];
  tags: ITag[] = TAGS_DATA;

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
    this.filteredProjects = [...this.projects];
    // Set 'all' tag as selected by default
    const allTag = this.tags.find(tag => tag.displayName === 'all');
    if (allTag) {
      allTag.isSelected = true;
      // Ensure other tags are deselected
      this.tags.forEach(t => {
        if (t !== allTag) t.isSelected = false;
      });
    }
  }

  toggleFilter(tag: ITag): void {
    if (tag.displayName === 'all') {
      // When 'all' is clicked, reset other selections
      this.tags.forEach(t => t.isSelected = t.displayName === 'all');
    } else {
      // When other tag is clicked, deselect 'all'
      const allTag = this.tags.find(t => t.displayName === 'all');
      if (allTag) allTag.isSelected = false;
      tag.isSelected = !tag.isSelected;
  
      // If no tags are selected after toggle, select 'all' tag
      const anyTagSelected = this.tags.some(t => t.isSelected);
      if (!anyTagSelected && allTag) {
        allTag.isSelected = true;
      }
    }
    this.updateFilteredProjects();
  }

  private updateFilteredProjects(): void {
    const selectedTags = this.tags
      .filter(tag => tag.isSelected)
      .map(tag => tag.displayName);

    // Show all projects if 'all' is selected or no tags selected
    if (selectedTags.includes('all') || selectedTags.length === 0) {
      this.filteredProjects = [...this.projects];
      return;
    }

    // Filter projects based on selected tags
    this.filteredProjects = this.projects.filter(project => {
      if (!project.tags || project.tags.length === 0) {
        // Project with no tags goes to 'others' category
        return selectedTags.includes('others');
      }
      // Check if project has any of the selected tags
      return project.tags.some(projectTag => 
        selectedTags.includes(projectTag.toLowerCase())
      );
    });
  }

  onProjectClick(project: IProject): void {
    this.router.navigate(['/portfolio/project', project.id]);
  }

  onBackClick(): void {
    this.router.navigateByUrl('/');
  }
}