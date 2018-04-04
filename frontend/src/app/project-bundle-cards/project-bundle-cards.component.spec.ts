import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBundleCardsComponent } from './project-bundle-cards.component';

describe('ProjectBundleCardsComponent', () => {
  let component: ProjectBundleCardsComponent;
  let fixture: ComponentFixture<ProjectBundleCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBundleCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBundleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
