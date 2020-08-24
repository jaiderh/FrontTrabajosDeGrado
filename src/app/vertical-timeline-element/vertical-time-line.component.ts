import { environment } from './../../environments/environment.prod';

import { ITimeLineElement } from './timeline-element';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-time-line',
  templateUrl: './vertical-time-line.component.html',
  styleUrls: ['./vertical-time-line.component.css', './vertical-timeline-element.component.css']
})
export class VerticalTimeLineComponent implements OnInit {

  animate = true;
  class = '';

  @Input()
  events: ITimeLineElement[];

  apiBasePath = environment.apiURL;

  constructor() { }

  ngOnInit() {
    if (this.animate) {
      this.class += ' vertical-timeline--animate';
    }
  }

  filePath(fileName: string, eventId: number) {
    const fileNameEncoded = encodeURI(fileName);
    return `${this.apiBasePath}file/download?type=EVENTO_PROYECTO&id=${eventId}&fileName=${fileNameEncoded}`;
  }

}
