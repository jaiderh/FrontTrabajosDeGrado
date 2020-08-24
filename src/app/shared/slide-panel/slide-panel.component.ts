import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class SlidePanelComponent implements OnInit {
  @Input() activePane: PaneType = 'left';

  constructor() { }

  ngOnInit() {
  }

}

type PaneType = 'left' | 'right';
