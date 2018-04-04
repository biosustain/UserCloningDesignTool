import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMultiSelectorComponent } from './part-multi-selector.component';

describe('PartMultiSelectorComponent', () => {
  let component: PartMultiSelectorComponent;
  let fixture: ComponentFixture<PartMultiSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartMultiSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
