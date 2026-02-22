import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from '@core/models/project.interface';
import { ProjectsService } from '@core/services/projects.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    standalone: false
})
  export class ProjectDetailsComponent implements OnInit {
    project?: IProject;
  
    constructor(
      private route: ActivatedRoute,
      private projectsService: ProjectsService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.route.params.subscribe((params) => {
        const projectId = params['id'];
        this.project = this.projectsService.getProjectById(projectId);
        if (!this.project) {
          this.router.navigate(['/portfolio']);
        }
      });
    }

    openLink(url: string | undefined): void {
      if (url) {
        window.open(url, '_blank');
      }
    }
  
    onBackClick() {
      this.router.navigate(['/portfolio']);
    }
  }