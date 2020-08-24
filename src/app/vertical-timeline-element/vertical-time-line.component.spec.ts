import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTimeLineComponent } from './vertical-time-line.component';

describe('VerticalTimeLineComponent', () => {
  let component: VerticalTimeLineComponent;
  let fixture: ComponentFixture<VerticalTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
