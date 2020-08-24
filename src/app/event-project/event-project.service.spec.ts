import { TestBed, inject } from '@angular/core/testing';

import { EventProjectService } from './event-project.service';

describe('EventProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventProjectService]
    });
  });

  it('should be created', inject([EventProjectService], (service: EventProjectService) => {
    expect(service).toBeTruthy();
  }));
});
