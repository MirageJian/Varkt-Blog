import {animate, state, style, transition, trigger} from "@angular/animations";

export const loadingAni = trigger('loadingAni', [
  // Style of  a stable state
  state('*', style({opacity: 1, transform: 'translateY(0)'})),
  transition(':enter', [
    // Style is initialized state
    style({opacity: 0, transform: 'translateY(-50%)'}),
    animate('0.25s ease-out')
  ]),
  transition(':leave', [
    // Style is that an animation needs to achieve
    animate('0.25s ease-in', style({opacity: 0, transform: 'translateY(50%)'}))
  ])
]);
