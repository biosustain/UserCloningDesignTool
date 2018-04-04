import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCsvDownloaderComponent } from './project-csv-downloader.component';

describe('ProjectCsvDownloaderComponent', () => {
  let component: ProjectCsvDownloaderComponent;
  let fixture: ComponentFixture<ProjectCsvDownloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCsvDownloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCsvDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
