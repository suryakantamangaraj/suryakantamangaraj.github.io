import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from '@core/models/project.interface';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: false
})
export class ProjectCardComponent {
  @Input() project!: IProject;
  @Output() cardClick = new EventEmitter<IProject>();
  isFlipped = false;

  constructor(private router: Router) {}

  toggleFlip(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isFlipped = !this.isFlipped;
  }

  onMoreInfoClick(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/portfolio/project', this.project.id]);
  }

  @HostListener('click', ['$event'])
  @HostListener('touchend', ['$event'])
  onInteraction(event: MouseEvent | TouchEvent): void {
    if (event.target instanceof HTMLElement && event.target.classList.contains('more-info-btn')) {
      this.onMoreInfoClick(event);
    } else {
      this.toggleFlip(event);
    }
  }
}
