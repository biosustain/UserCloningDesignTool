import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

import { saveAs } from 'file-saver';

import { createAmuserSettingForm } from '../amuser-settings'
import { Part } from '../part';
import { Project } from '../project';
import { Combinatorial } from '../combinatorial'
import { CombinatorialService } from '../combinatorial.service'

@Component({
  selector: 'app-combinatorial-detail',
  templateUrl: './combinatorial-detail.component.html',
  styleUrls: ['./combinatorial-detail.component.scss']
})
export class CombinatorialDetailComponent implements OnInit {
  public newCombinatorialForm: FormGroup;
  public combinatorial: Combinatorial;
  public projectObservable: Observable<Project[]>;

  private _combinatorialObservable: Observable<Combinatorial>;

  constructor(
    private _combinatorialService: CombinatorialService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this._combinatorialObservable = this._combinatorialService.get(id);
      this.updateProjectObservables()
      this._combinatorialObservable
            .subscribe(res => {this.combinatorial = res;
              this.initForm()
              this.updateProjectObservables()
            });
      });
  }


  updateProjectObservables() {
   this.projectObservable = this._combinatorialObservable.map(res => res.projects)
      .catch(error => {
              return Observable.of<Project[]>([]);
            });
  }

  initForm(): void {
    const partFormArray: FormGroup[] = this.initPartFormArray(this.combinatorial.parts)

    this.newCombinatorialForm = this.fb.group({
      name: [this.combinatorial.name, Validators.required],
      description: [this.combinatorial.description],
      parts: this.fb.array(
        partFormArray, Validators.minLength(2)),
      amusercloning: createAmuserSettingForm(this.combinatorial.amusercloning, this.fb)
    })

    this.newCombinatorialForm.valueChanges
                       .debounceTime(500)
                       .subscribe(data => {
      this.save()
    })
  }

  private initPartFormArray(partArray: Part[][]): FormGroup[] {
    const partFormArray = partArray.map(part => {
      return this.initColumn(part);
    });
    return partFormArray;
  }

  private initColumn(parts: Part[]): FormGroup {
    const PartFormArray = parts.map(part => {
      return this.initPartForm(part);
    });
    return this.fb.group({
      parts: this.fb.array(PartFormArray, Validators.compose([Validators.minLength(1), Validators.required])),
    });
  }

  private initPartForm(part: Part) {
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
    this._combinatorialService.getCsv(this.combinatorial)
                        .subscribe(
                          res => {
                            const blob = new Blob([res], {type: 'text/csv'})
                            saveAs(blob, this.combinatorial.name + '.csv')
                          },
                          error => {
                            console.log('Error downloading the file.')
                          },
                          () => { }
                        );
  }

  downloadGenbank() {
    this._combinatorialService.getGenbank(this.combinatorial)
      .subscribe(
        res => {
          const blob = new Blob([res], {type: 'application/x-zip-compressed'});
            saveAs(blob, this.combinatorial.name + '.zip');
          },
        error => {
          console.log('Error downloading the file.')
          },
        () => { }
      );
    }

  save(): void {
    if (this.newCombinatorialForm.valid) {
      const combinatorial = <Combinatorial>this.newCombinatorialForm.value;
      combinatorial.parts = this.combinatorial.parts.map(res => {
        return res;
      })
      combinatorial.id = this.combinatorial.id;
      this._combinatorialService.update(combinatorial)
                         .subscribe(
                            res => {
                              this.combinatorial = res;
                              this.updateProjectObservables();
                            },
                            err => {
                              console.log(err);
                            });
     }

  }
}
