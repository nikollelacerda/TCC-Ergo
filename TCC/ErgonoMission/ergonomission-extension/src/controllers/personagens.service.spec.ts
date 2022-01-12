import { TestBed } from '@angular/core/testing';

import { PersonagensService } from './personagens.service';

describe('PersonagensService', () => {
  let service: PersonagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
