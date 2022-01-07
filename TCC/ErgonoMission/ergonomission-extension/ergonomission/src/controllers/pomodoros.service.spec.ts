import { TestBed } from '@angular/core/testing';

import { PomodorosService } from './pomodoros.service';

describe('PomodorosService', () => {
  let service: PomodorosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodorosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
