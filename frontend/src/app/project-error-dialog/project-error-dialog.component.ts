import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Project } from '../project'


@Component({
  selector: 'app-project-error-dialog',
  templateUrl: './project-error-dialog.component.html',
  styleUrls: ['./project-error-dialog.component.scss']
})
export class ProjectErrorDialogComponent implements AfterViewInit {
  project_name: String;
  errors: String[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.errors = this.data['errorArray'];
      this.project_name = this.data['project_name'];
    }, 200)
  }

}
