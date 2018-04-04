import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerDetailComponent } from './primer-detail.component';

describe('PrimerDetailComponent', () => {
  let component: PrimerDetailComponent;
  let fixture: ComponentFixture<PrimerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
