import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSelectorComponent } from './part-selector.component';

describe('PartSelectorComponent', () => {
  let component: PartSelectorComponent;
  let fixture: ComponentFixture<PartSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
