import {animate, state, style, transition, trigger} from '@angular/animations';

// Component transition animations
export const routeAnimation = [
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        // transform: 'translateX(-100%)'
      }),
      animate('0.5s ease-in')
    ]),
    transition(':leave', [
      animate('0s ease-out', style({
        opacity: 0,
        // transform: 'translateY(100%) scale(2, 2)'
      }))
    ])
  ])
];
export function slideFromBottom() {
  return trigger('slideFromBottom', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
    ])
  ]);
}

export const slideFromRight = trigger('textTransition', [
  state('void', style({ 'padding-top': '20px', opacity: '0' })),
  state('*', style({ 'padding-top': '0px', opacity: '1' })),
  transition(':enter', [
    animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
  ])
]);

export function slideFromUp() {
  return trigger('routerTransition', [
    state('void', style({ 'margin-top': '10px', opacity: '0' })),
    state('*', style({ 'margin-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.3s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
    ])
  ]);
}
