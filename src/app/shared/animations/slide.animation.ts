import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0,
      transform: 'translateY(-20px)'
    }),
    animate('300ms ease-out', style({ 
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ 
      opacity: 0,
      transform: 'translateY(-20px)'
    }))
  ])
]);

export const slideUpAnimation = trigger('slideUpAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(30px)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
  ])
]);

export const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger('100ms', [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);