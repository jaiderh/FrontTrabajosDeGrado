import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProjectComponent } from './event-project.component';

describe('EventProjectComponent', () => {
  let component: EventProjectComponent;
  let fixture: ComponentFixture<EventProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
