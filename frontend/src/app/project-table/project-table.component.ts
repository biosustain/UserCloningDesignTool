import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { ProjectErrorDialogComponent } from '../project-error-dialog/project-error-dialog.component';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Project } from '../project';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
  @Input() projectObservable: Observable<Project[]>
  @Output() projectObservableChange: EventEmitter<Project[]> = new EventEmitter()


  projectList: Project[] = [];
  selectedProjects: Project[] = [];
  projectSubscription: Subscription;

  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Project name'},
    { name: 'description', label: 'Description'},
    { name: 'parts', label: 'Number of parts'},
    { name: 'actions', label: 'Actions'},
  ];

  hasData: boolean = false;


  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.projectSubscription = this.projectObservable.subscribe(
      res => {
        this.hasData = true;
        this.projectList = res;
      }
    )
  }

  select(project: Project): void {
    /*
      Toggle select on a single project row and
      emit the new select list
    */
    const index = this.getProjectIdx(project);
    if (index > -1) {
      this.selectedProjects.splice(index, 1);
    } else {
      this.selectedProjects.push(project);
    }
    this.projectObservableChange.emit(this.selectedProjects);
  }

  selectAll(checked: boolean): void {
    /*
      Toggle select on all projects and emit the new list
    */
    if (this.hasData) {
      if (checked) {
        this.selectedProjects = [];
      } else {
        this.projectList.map( project => {
          if (!this.isProjectSelected(project)) {
            this.selectedProjects.push(project);
          }
        })
      }
    }
    this.projectObservableChange.emit(this.selectedProjects);
  }

  isProjectSelected(project: Project): boolean {
    /*
      Returns a boolean indicating whether the project
      is present in the selectedProjects list
    */
    return this.getProjectIdx(project) > -1;
  }

  isAllSelected(): boolean {
    /*
      Returns true if ALL projects in the table are selected
    */
    return this.projectList.every(el => this.isProjectSelected(el));
  }

  isAnySelected(): boolean {
    /*
      Returns true if ANY project in the table is selected
    */
    return this.projectList.some(el => this.isProjectSelected(el));
  }

  getProjectIdx(project: Project): number {
    /*
      Finds the id of the project in the selected array
      based on the id of the project itself.
    */
    return this.selectedProjects.map(el => el.id).indexOf(project.id)
  }

  openErrorDialog(project: Project) {
    this.dialog.open(ProjectErrorDialogComponent, {
      data: {
        errorArray: project.errors,
        project_name: project.name
      }
    });
  }

  blockEvent($ev) {
    
  }

}
