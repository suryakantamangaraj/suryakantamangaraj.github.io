import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from '@core/models/project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: IProject;
  @Output() cardClick = new EventEmitter<IProject>();

  constructor(private router: Router) {}

  onMoreInfoClick(project: IProject, event: MouseEvent): void {
    event.stopPropagation();
    this.cardClick.emit(project);
  }
}