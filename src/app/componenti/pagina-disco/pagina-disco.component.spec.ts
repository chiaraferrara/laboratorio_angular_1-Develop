import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDiscoComponent } from './pagina-disco.component';

describe('PaginaDiscoComponent', () => {
  let component: PaginaDiscoComponent;
  let fixture: ComponentFixture<PaginaDiscoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaDiscoComponent]
    });
    fixture = TestBed.createComponent(PaginaDiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
