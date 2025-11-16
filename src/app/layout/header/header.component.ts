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
    { path: 'https://archive.suryaraj.com', name: 'Archive', external: true },
  ];

  scribeItems: NavItem[] = [
    { path: 'https://blog.suryaraj.com', name: 'Blog' },
    { path: 'https://wiki.suryaraj.com', name: 'Wiki' },
  ];

  miscItems: NavItem[] = [
    { path: 'https://toolbox.suryaraj.com', name: 'Toolbox' },
    { path: 'https://utilities.suryaraj.com/', name: 'Utilities' },
    { path: 'https://suryaraj.com/Mathematics', name: 'MathNotes' },
  ];

  // Common handler for both click and touch
  handleExternalNavigation(event: MouseEvent | TouchEvent, path: string): void {
    event.preventDefault();
    event.stopPropagation();
    window.open(path, '_blank');
  }

  // Update toggleDropdown
  toggleDropdown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const dropdownType = target.getAttribute('data-dropdown');

    // Close other dropdowns first
    if (this.activeDropdown && this.activeDropdown !== dropdownType) {
      this.activeDropdown = null;
    }

    this.activeDropdown = this.activeDropdown === dropdownType ? null : dropdownType;
  }

  @HostListener('document:click')
  @HostListener('document:touchend')
  closeDropdown(): void {
    this.activeDropdown = null;
  }
}
