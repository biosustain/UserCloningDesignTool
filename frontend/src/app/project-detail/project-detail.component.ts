import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DragulaService } from 'ng2-dragula/ng2-dragula'
import { CustomValidators } from 'ng2-validation';

import { saveAs } from 'file-saver';

import { SeqRecord } from '../seq-record';
import { SeqRecordService } from '../seq-record.service';

import { createAmuserSettingForm } from '../amuser-settings';
import { Part } from '../part';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { PartService } from '../part.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public newProjectForm: FormGroup;
  public project: Project;

  constructor(
    private _projectService: ProjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) {

  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this._projectService
        .get(id)
        .subscribe(res => {this.project = res;
                           this.initForm()
                         });
      });
  }

  initForm() {
    this.newProjectForm = this.fb.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description],
      parts: this.fb.array(this.project.parts.map(a => this.initPartForm(a)), Validators.minLength(2)),
      amusercloning: createAmuserSettingForm(this.project.amusercloning, this.fb)
    })

    this.newProjectForm.valueChanges
      .debounceTime(500)
      .subscribe(data => {
        this.save()
      })
  }

  initPartForm(part: Part) {
    const fg = this.fb.group({
      id: [part.id],
      name: [part.name, Validators.required],
      order: [part.order, Validators.required],
      ice_name: [part.ice_name, Validators.required],
      ice_id: [part.ice_id, Validators.required],
      errors: [part.errors, Validators.maxLength(0)]
    });
    return fg;
  }

  downloadCsv() {
    this._projectService.getCsv([this.project])
                        .subscribe(
                          res => {
                            const blob = new Blob([res], {type: 'text/csv'})
                            saveAs(blob, this.project.name + '.csv')
                          },
                          error => {
                            console.log('Error downloading the file.')
                          },
                          () => { }
                        );
  }

  downloadGenbank() {
    this._projectService.getGenbank(this.project)
      .subscribe(
        res => {
          const blob = new Blob([res], {type: 'application/x-zip-compressed'});
            saveAs(blob, this.project.name + '.gb');
          },
        error => {
          console.log('Error downloading the file.')
          },
        () => { }
        );
    }


  save(): void {
    console.log(this.newProjectForm);
    if (this.newProjectForm.valid) {
      const project = <Project>this.newProjectForm.value;
      project.id = this.project.id;
      this._projectService.update(project)
                         .subscribe(
                            res => {
                              this.project = res;
                            },
                            err => {
                              console.log(err);
                            });
     }

  }
}
