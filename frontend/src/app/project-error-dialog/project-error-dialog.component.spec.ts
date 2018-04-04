import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectErrorDialogComponent } from './project-error-dialog.component';

describe('ProjectErrorDialogComponent', () => {
  let component: ProjectErrorDialogComponent;
  let fixture: ComponentFixture<ProjectErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
