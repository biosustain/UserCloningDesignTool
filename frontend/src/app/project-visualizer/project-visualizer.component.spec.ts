import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVisualizerComponent } from './project-visualizer.component';

describe('ProjectVisualizerComponent', () => {
  let component: ProjectVisualizerComponent;
  let fixture: ComponentFixture<ProjectVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
