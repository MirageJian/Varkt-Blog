import {animate, state, style, transition, trigger} from '@angular/animations';

// Component transition animations
export const routerTrans = [
  trigger('routerTrans', [
    state('*', style({opacity: 1, transform: 'translateX(0)'})),
    transition(':enter', [
      style({opacity: 0, transform: 'translateX(-10%)'}),
      animate('0.33s ease-out')
    ]),
    // transition(':leave', [
    //   animate('0.33s ease-in', style({opacity: 0, transform: 'translateX(10%)'}))
    // ])
  ])
];
export function slideFromBottom() {
  return trigger('slideFromBottom', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [animate('0.33s ease-out')]),
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
  return trigger('slideFromUp', [
    state('void', style({ 'margin-top': '10px', opacity: '0' })),
    state('*', style({ 'margin-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.3s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
    ])
  ]);
}
