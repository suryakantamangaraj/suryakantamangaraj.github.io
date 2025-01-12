import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';
import { IProject } from '../../../core/models/project.interface';
import { TAGS_DATA } from '../../../core/data/tags.data';
import { ITag } from '../../../core/models/tag.interface';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  featuredProjects: IProject[] = [];
  filteredProjects: IProject[] = [];
  tags = TAGS_DATA;

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.featuredProjects = this.projectsService.getProjects(); // Get all projects
    this.filteredProjects = [...this.featuredProjects]; // Initialize with all projects
  }

  ngAfterViewInit() {
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');
    const line3 = document.querySelector('.line3');

    setTimeout(() => {
      if (line2) line2.setAttribute('style', 'display: block');
    }, 4500);

    setTimeout(() => {
      if (line3) line3.setAttribute('style', 'display: block');
    }, 9000);
  }

  toggleFilter(tag: ITag) {
    tag.isSelected = !tag.isSelected;
    this.filterProjects();
  }

  private filterProjects() {
    const selectedTags = this.tags.filter(tag => tag.isSelected)
                                .map(tag => tag.displayName);
    
    this.filteredProjects = this.featuredProjects.filter(project => 
      project.tags?.some(tag => selectedTags.includes(tag))
    );
  }

  onBackClick() {
    this.router.navigateByUrl('/');
  }

  onProjectClick(project: IProject) {
    console.log('Project clicked:', project); // Debug line
    this.router.navigate(['/portfolio/project', project.id]);
  }
}