import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

export const searchBox = trigger('searchBox', [
  state('*', style({opacity: 1, left: 0, right: 0})),
  transition(':enter', [
    animate('0.25s ease-in', keyframes([
      style({opacity: 0, left: 'calc(100% - 152px)', right: 40, offset: 0}),
      style({opacity: 1, left: 'calc(70% - 152px)', right: 28, offset: 0.3}),
      style({opacity: 1, left: 0, right: 0, offset: 1}),
    ]))
  ]),
  transition(':leave', [
    animate('0.25s ease-out', keyframes([
      style({opacity: 1, left: 0, right: 0, offset: 0}),
      style({opacity: 1, left: 'calc(70% - 152px)', right: 28, offset: 0.7}),
      style({opacity: 0, left: 'calc(100% - 152px)', right: 40, offset: 1}),
    ])),
  ])
]);
