import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInsertDiskComponent } from './page-insert-disk.component';

describe('PageInsertDiskComponent', () => {
  let component: PageInsertDiskComponent;
  let fixture: ComponentFixture<PageInsertDiskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageInsertDiskComponent]
    });
    fixture = TestBed.createComponent(PageInsertDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
