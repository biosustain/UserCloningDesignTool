import { Component, OnInit } from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectBundleComponent } from '../project-bundle/project-bundle.component';

@Component({
  selector: 'app-project-bundle-cards',
  templateUrl: './project-bundle-cards.component.html',
  styleUrls: ['./project-bundle-cards.component.css'],
  animations: [
  trigger('openCreateSingleProject', [
    state('shown' , style({ opacity: 1 })),
    state('hidden', style({ opacity: 0 })),
    transition('* => *', animate('.5s'))
    ])
  ]
})
export class ProjectBundleCardsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openCreateMultipleProjects() {
    const dialogRef = this.dialog.open(ProjectBundleComponent);
  }
}
