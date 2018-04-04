import { Component, OnInit, ViewChild, ElementRef, Type } from '@angular/core';
import { Input, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { Part } from '../part';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { AmuserSetting } from '../amuser-settings';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { ProjectBundleComponent } from '../project-bundle/project-bundle.component';
import { WelcomeTextComponent } from '../welcome-text/welcome-text.component';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  entryComponents: [
    NewProjectComponent,
    WelcomeTextComponent
  ],
})
export class ProjectListComponent implements OnInit {
  private toggle: boolean = true;
  private currentCommponent = null;

  // Indicators for whether one of the cards is selected
  public browse_active: boolean = false;
  public single_active: boolean = false;
  public multiple_active: boolean = false;

  @ViewChild('componentBlock', {read: ViewContainerRef}) ComponentContainer: ViewContainerRef;


  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _projectService: ProjectService
  ) { }

  ngOnInit() {
    this.openWelcomeText();
  }

  setComponentBlock(inputComponent: Type<any>) {
    const factory = this._componentFactoryResolver.resolveComponentFactory(inputComponent);
    this.ComponentContainer.clear();
    const componentRef = this.ComponentContainer.createComponent(factory);
  }

  downloadCsv() {
    this._projectService.getCsv()
                        .subscribe(
                          res => {
                            const blob = new Blob([res], {type: 'text/csv'})
                            saveAs(blob, 'test.csv')
                          },
                          error => {
                            console.log('Error downloading the file.')
                          },
                          () => {
                          }
                        );
  }

  downloadFile(data: Response){
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  openWelcomeText() {
    this.setComponentBlock(WelcomeTextComponent);
  }

  openBrowseProject() {
    this.setComponentBlock(ProjectSearchComponent);
    this.browse_active = true;
    this.single_active = false;
    this.multiple_active = false;
  }

  openCreateSingleProject() {
    this.setComponentBlock(NewProjectComponent);
    this.browse_active = false;
    this.single_active = true;
    this.multiple_active = false;
  }

  openCreateMultipleProjects() {
    this.setComponentBlock(ProjectBundleComponent);
    this.browse_active = false;
    this.single_active = false;
    this.multiple_active = true;
  }

  toggleChange() {
    this.toggle = !this.toggle;
  }
}
