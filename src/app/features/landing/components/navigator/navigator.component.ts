import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        query('.nav-item', [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          stagger(80, [
            animate('0.4s ease', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ]),
      transition(':leave', [
        query('.nav-item', [
          stagger(80, [
            animate('0.4s ease', style({ opacity: 0, transform: 'translateX(100%)' }))
          ])
        ])
      ])
    ])
  ]
})
export class NavigatorComponent {
  isVisible$ = this.navigationService.isNavigatorVisible$;
  
  navLinks = [
    { displayName: 'Portfolio', url: '/portfolio' },
    { displayName: 'About', url: '/about' },
    { displayName: 'Contact', url: '/contact' },
    { displayName: 'Blog', url: 'https://blog.suryaraj.me', external: true },
    { displayName: 'Wiki', url: 'https://wiki.suryaraj.me', external: true },
    { displayName: 'Archive', url: 'https://archive.suryaraj.me', external: true },
    { displayName: 'Tools', url: 'https://tools.suryaraj.me', external: true }, 
    { displayName: 'Math Notes', url: 'https://math.suryaraj.me', external: true },
    { displayName: 'Utilities', url: 'https://utils.suryaraj.me', external: true }
  ];

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  onNavigatorClick(event: MouseEvent): void {
    if ((event.target as Element).classList.contains('navigator-container')) {
      this.navigationService.hideNavigator();
    }
  }
}