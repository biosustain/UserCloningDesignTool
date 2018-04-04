import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinatorialTableComponent } from './combinatorial-table.component';

describe('CombinatorialTableComponent', () => {
  let component: CombinatorialTableComponent;
  let fixture: ComponentFixture<CombinatorialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinatorialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinatorialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
