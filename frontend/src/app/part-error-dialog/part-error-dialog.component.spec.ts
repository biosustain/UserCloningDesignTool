import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartErrorDialogComponent } from './part-error-dialog.component';

describe('PartErrorDialogComponent', () => {
  let component: PartErrorDialogComponent;
  let fixture: ComponentFixture<PartErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
