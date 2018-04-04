import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceLoginSetterComponent } from './ice-login-setter.component';

describe('IceLoginSetterComponent', () => {
  let component: IceLoginSetterComponent;
  let fixture: ComponentFixture<IceLoginSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceLoginSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceLoginSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
