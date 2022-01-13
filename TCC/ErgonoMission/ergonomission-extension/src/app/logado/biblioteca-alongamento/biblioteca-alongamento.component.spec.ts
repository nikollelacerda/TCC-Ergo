import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaAlongamentoComponent } from './biblioteca-alongamento.component';

describe('BibliotecaAlongamentoComponent', () => {
  let component: BibliotecaAlongamentoComponent;
  let fixture: ComponentFixture<BibliotecaAlongamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliotecaAlongamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaAlongamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
