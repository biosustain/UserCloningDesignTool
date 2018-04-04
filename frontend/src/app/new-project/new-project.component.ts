import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CustomValidators } from 'ng2-validation';
import { StepState } from '@covalent/core';

import { createDefaultAmuserSettingForm } from '../amuser-settings'
import { Project } from '../project';
import { ProjectService } from '../project.service'

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  public newProjectForm: FormGroup;
  public formSubmitted: boolean;
  public events: any[] = [];

  public activePanel = 0;

  stateStep = [StepState.None, StepState.None, StepState.None, StepState.None]

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const nameValidator = Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5)])
    this.newProjectForm = this.fb.group({
      name: ['', nameValidator],
      description: [''],
      parts: this.fb.array([], Validators.compose([Validators.minLength(2), Validators.required])),
      amusercloning: createDefaultAmuserSettingForm(this.fb)
    })
  }

  setActiveTab(newTab: number): void {
    this.activePanel = newTab;
  }

  firstTabValid() {
    return this.newProjectForm.controls['name'].valid && this.newProjectForm.controls['description'].valid;
  }

  secondTabValid() {
    return (this.firstTabValid() && this.newProjectForm.controls['parts'].valid);
  }

  thirdTabValid() {
    return this.secondTabValid() && this.newProjectForm.controls['amusercloning'].valid;
  }

  toggleState(idx: number) {
    this.stateStep[idx] = StepState.Complete;
  }

  getProject(): Project {
    return <Project>this.newProjectForm.value;
  }

  submit() {
      this.formSubmitted = true; // set form submit to true

      // check if model is valid
      // if valid, call API to save customer
      const project = this.getProject();
      this.projectService.create(project)
                         .subscribe(
                            res => {
                              this.router.navigate(['/projects', res.id]);
                            },
                            err => {
                              console.log(err);
                            });
  }
}
