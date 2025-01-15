import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from '@core/models/project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project!: IProject;
  @Output() cardClick = new EventEmitter<IProject>();

  constructor(private router: Router) {}

  onMoreInfoClick(project: IProject, event: MouseEvent): void {
    event.stopPropagation();
    this.cardClick.emit(project);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    const card = event.currentTarget as HTMLElement;
    const inner = card.querySelector('.card-inner') as HTMLElement;
    inner.style.transform = 'rotateY(180deg)';
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    const card = event.currentTarget as HTMLElement;
    const inner = card.querySelector('.card-inner') as HTMLElement;
    inner.style.transform = 'rotateY(0)';
  }
}
