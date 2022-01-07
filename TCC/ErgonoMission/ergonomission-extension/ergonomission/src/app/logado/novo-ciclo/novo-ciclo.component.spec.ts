import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCicloComponent } from './novo-ciclo.component';

describe('NovoCicloComponent', () => {
  let component: NovoCicloComponent;
  let fixture: ComponentFixture<NovoCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
