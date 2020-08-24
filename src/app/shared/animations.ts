import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ opacity: 0 }),
        animate('0.4s ease-in-out', style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1 }),
        animate('0.4s ease-in-out', style({ opacity: 0 }))
      ], { optional: true }),
    ])
  ])
]);

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
      ], { optional: true }),
    ])
  ])
]);
