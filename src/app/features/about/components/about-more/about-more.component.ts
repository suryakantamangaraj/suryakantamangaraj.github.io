import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about-more',
    templateUrl: './about-more.component.html',
    styleUrls: ['./about-more.component.scss'],
    standalone: false
})
export class AboutMoreComponent {
  constructor(private router: Router) {}

  onBackClick(): void {
    this.router.navigateByUrl('/about'); // Changed from '/' to '/about'
  }
}