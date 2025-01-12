import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, query, animate, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('* => *', [
        query(':enter', style({ marginLeft: '50%', opacity: 0 }), { optional: true }),
        query(':leave', style({ marginLeft: '0%', opacity: 1 }), { optional: true }),
        query(':enter', [
          stagger('0.2s', [
            animate('0.5s ease-out', keyframes([
              style({ offset: 0 }),
              style({ marginLeft: '0%', opacity: 0.8, offset: 0.8 }),
              style({ marginLeft: '-10%', opacity: 1, offset: 0.9 }),
              style({ marginLeft: '0%', opacity: 1, offset: 1 })
            ]))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class NavigationMenuComponent {
  navLinks = [
    { displayName: 'Portfolio', url: '/portfolio' },
    { displayName: 'About & Skills', url: '/about' },
    { displayName: 'Contacts & Profiles', url: '/profiles' },
    { displayName: 'Profile Card', url: '/profile-card' }
  ];

  @Output() menuClosed = new EventEmitter<void>();

  constructor(private router: Router) {}

  onBgClick() {
    this.menuClosed.emit();
  }

  onNavItemClick(e: Event, url: string) {
    e.stopPropagation();
    this.router.navigateByUrl(url);
    this.menuClosed.emit();
  }
}