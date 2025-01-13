import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems = [
    { path: '/about', name: 'About', external: false, dataTest: 'nav-about' },
    { path: '/portfolio', name: 'Portfolio', external: false, dataTest: 'nav-portfolio' },
    { path: '/contact', name: 'Contact', external: false, dataTest: 'nav-contact' },
    { path: 'https://suryaraj.me/Archive', name: 'Archive', external: true },
  ];

  scribeItems = [
    { path: 'https://blog.suryaraj.me', name: 'Blog' },
    { path: 'https://wiki.suryaraj.me', name: 'Wiki' },
  ];

  miscItems = [
    { path: 'https://suryaraj.me/Tools', name: 'Tools' },
    { path: 'https://suryaraj.me/Mathematics', name: 'MathNotes' },
  ];
}
