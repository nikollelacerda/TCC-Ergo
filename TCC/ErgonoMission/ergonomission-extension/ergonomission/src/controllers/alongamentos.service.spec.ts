import { TestBed } from '@angular/core/testing';

import { AlongamentosService } from './alongamentos.service';

describe('AlongamentosService', () => {
  let service: AlongamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlongamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
