import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTimelineElementComponent } from './vertical-timeline-element.component';

describe('VerticalTimelineElementComponent', () => {
  let component: VerticalTimelineElementComponent;
  let fixture: ComponentFixture<VerticalTimelineElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTimelineElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTimelineElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
