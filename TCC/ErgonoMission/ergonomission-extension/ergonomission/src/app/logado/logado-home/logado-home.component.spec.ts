import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogadoHomeComponent } from './logado-home.component';

describe('LogadoHomeComponent', () => {
  let component: LogadoHomeComponent;
  let fixture: ComponentFixture<LogadoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogadoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogadoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
