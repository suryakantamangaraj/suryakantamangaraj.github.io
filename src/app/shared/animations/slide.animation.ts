import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Slide animation - for vertical transitions
 * Used in About and Portfolio components
 */
export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0,
      transform: 'translateY(-20px)'
    }),
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
      opacity: 0,
      transform: 'translateY(-20px)'
    }))
  ])
]);

/**
 * Slide up animation - for landing page elements
 * Used in Landing component
 */
export const slideUpAnimation = trigger('slideUpAnimation', [
  transition(':enter', [
    style({ 
      transform: 'translateY(30px)', 
      opacity: 0 
    }),
    animate('500ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
      transform: 'translateY(0)', 
      opacity: 1 
    }))
  ])
]);