import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navItems = [
    { path: '/about', name: 'About', external: false },
    { path: '/portfolio', name: 'Portfolio', external: false },
    { path: '/contact', name: 'Contact', external: false },
    { path: 'https://suryaraj.me/Archive', name: 'Archive', external: true }
  ];

  scribeItems = [
    { path: 'https://blog.suryaraj.me', name: 'Blog' },
    { path: 'https://wiki.suryaraj.me', name: 'Wiki' }
  ];

  miscItems = [
    { path: 'https://suryaraj.me/Tools', name: 'Tools' },
    { path: 'https://suryaraj.me/Mathematics', name: 'MathNotes' }
  ];
}