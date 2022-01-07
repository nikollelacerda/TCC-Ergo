import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaAlogamentoComponent } from './biblioteca-alogamento.component';

describe('BibliotecaAlogamentoComponent', () => {
  let component: BibliotecaAlogamentoComponent;
  let fixture: ComponentFixture<BibliotecaAlogamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliotecaAlogamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaAlogamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
