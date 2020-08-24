import { ITimeLineElement } from './timeline-element';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vertical-timeline-element',
  templateUrl: './vertical-timeline-element.component.html',
  styleUrls: ['./vertical-timeline-element.component.css'],
  host: {'class': 'vertical-timeline-element'}
})
export class VerticalTimelineElementComponent implements OnInit {

  @Input()
  timeLineEvent: ITimeLineElement;


  constructor() { }

  ngOnInit() {

    if ( this.timeLineEvent.position === 'left' ) {
      this.timeLineEvent.class += ' vertical-timeline-element--left';
    }

    if ( this.timeLineEvent.position === 'right' ) {
      this.timeLineEvent.class += ' vertical-timeline-element--right';
    }
  }

  get elementClasses()  {
    let classes =
    {
      'icon-event-work' : this.timeLineEvent.iconStyle==='icon-event-work',
      'icon-event-education' : this.timeLineEvent.iconStyle==='icon-event-education',
      'bounce-in': this.timeLineEvent.state.visible,
      'is-hidden': !this.timeLineEvent.state.visible
    };

    return classes;
  }

}
