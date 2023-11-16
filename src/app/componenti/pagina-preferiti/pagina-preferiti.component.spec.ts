import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPreferitiComponent } from './pagina-preferiti.component';

describe('PaginaPreferitiComponent', () => {
  let component: PaginaPreferitiComponent;
  let fixture: ComponentFixture<PaginaPreferitiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaPreferitiComponent]
    });
    fixture = TestBed.createComponent(PaginaPreferitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
