import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErgonomiaInfoComponent } from './ergonomia-info.component';

describe('ErgonomiaInfoComponent', () => {
  let component: ErgonomiaInfoComponent;
  let fixture: ComponentFixture<ErgonomiaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErgonomiaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErgonomiaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
