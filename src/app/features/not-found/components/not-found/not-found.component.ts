import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))]),
        ]),
    ],
    standalone: false
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  onBackClick(): void {
    this.router.navigate(['/']);
  }
}
