import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInserireDiscoComponent } from './form-inserire-disco.component';

describe('FormInserireDiscoComponent', () => {
  let component: FormInserireDiscoComponent;
  let fixture: ComponentFixture<FormInserireDiscoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormInserireDiscoComponent]
    });
    fixture = TestBed.createComponent(FormInserireDiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
