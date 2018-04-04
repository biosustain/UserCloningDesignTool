import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinatorialDetailComponent } from './combinatorial-detail.component';

describe('CombinatorialDetailComponent', () => {
  let component: CombinatorialDetailComponent;
  let fixture: ComponentFixture<CombinatorialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinatorialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinatorialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
