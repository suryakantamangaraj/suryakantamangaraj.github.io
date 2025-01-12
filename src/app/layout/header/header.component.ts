import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navItems = [
    { path: '/portfolio', name: 'Portfolio', external: false },
    { path: '/about', name: 'About', external: false },
    { path: '/contact', name: 'Contact', external: false },
    { path: 'https://blog.suryaraj.me', name: 'Blog', external: true },
    { path: 'https://wiki.suryaraj.me', name: 'Wiki', external: true }
  ];

  miscItems = [
    { path: 'https://suryaraj.me/Tools', name: 'Tools' },
    { path: 'https://suryaraj.me/Mathematics', name: 'MathNotes' }
  ];
}