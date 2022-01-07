import { TestBed } from '@angular/core/testing';

import { CosmeticosService } from './cosmeticos.service';

describe('CosmeticosService', () => {
  let service: CosmeticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmeticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
