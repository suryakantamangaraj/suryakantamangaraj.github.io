import { Component, HostListener } from '@angular/core';

interface NavItem {
  path: string;
  name: string;
  external?: boolean;
  dataTest?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  activeDropdown: string | null = null;

  navItems: NavItem[] = [
    { path: '/about', name: 'About', dataTest: 'about-link' },
    { path: '/portfolio', name: 'Portfolio', dataTest: 'portfolio-link' },
    { path: '/contact', name: 'Contact', dataTest: 'contact-link' },
    { path: 'https://suryaraj.me/Archive', name: 'Archive', external: true },
  ];

  scribeItems: NavItem[] = [
    { path: 'https://blog.suryaraj.me', name: 'Blog' },
    { path: 'https://wiki.suryaraj.me', name: 'Wiki' },
  ];

  miscItems: NavItem[] = [
    { path: 'https://toolbox.suryaraj.me', name: 'Toolbox' },
    { path: 'https://suryaraj.me/Mathematics', name: 'MathNotes' },
  ];

  toggleDropdown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const dropdownType = target.getAttribute('data-dropdown');
    this.activeDropdown = this.activeDropdown === dropdownType ? null : dropdownType;
  }

  @HostListener('document:click')
  @HostListener('document:touchend')
  closeDropdown(): void {
    this.activeDropdown = null;
  }
}
