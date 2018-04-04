import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../project'

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();

  selected = false;
  expanded = false;

  constructor() { }

  ngOnInit() {
    if (!this.project.description) {
      this.project.description = 'no description'
    }
  }

  addToCsv() {
    this.selected = !this.selected;
    this.projectChange.emit(this.project);
  }
}
