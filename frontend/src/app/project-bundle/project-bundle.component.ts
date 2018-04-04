import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomValidators } from 'ng2-validation';
import { StepState } from '@covalent/core';

import { createDefaultAmuserSettingForm } from '../amuser-settings'

import { Part } from '../part';
import { PartService } from '../part.service';

import { Combinatorial } from '../combinatorial';

import { CombinatorialService } from '../combinatorial.service';

@Component({
  selector: 'app-project-bundle',
  templateUrl: './project-bundle.component.html',
  styleUrls: ['./project-bundle.component.css']
})
export class ProjectBundleComponent implements OnInit {
  public newProjectForm: FormGroup;
  public formSubmitted: boolean;
  public events: any[] = [];

  public activePanel = 0;
  stateStep = [StepState.None, StepState.None, StepState.None, StepState.None]

  private selectedColumn: FormArray;
  private selectedIndex: number;
  private combinatorial: Combinatorial;

  private searchTerms = new BehaviorSubject<string>('');
  private searchParts: Observable<Part[]>;

  constructor(
    private fb: FormBuilder,
    private partService: PartService,
    private combinatorialService: CombinatorialService,
    private router: Router
  ) { }

  ngOnInit() {
    const nameValidator = Validators.compose([Validators.required, Validators.maxLength(46), Validators.minLength(2)])
    this.newProjectForm = this.fb.group({
      name: ['', nameValidator],
      description: [''],
      parts: this.fb.array(
        [this.initColumn(), this.initColumn()], Validators.minLength(2)),
      amusercloning: createDefaultAmuserSettingForm(this.fb)
    })

    this.searchParts = this.searchTerms
                           .debounceTime(300)
                           .distinctUntilChanged()
                           .switchMap(term => this.partService.search(term))
                           .catch(error => {
                             console.log(error);
                             return Observable.of<Part[]>([]);
                           });
  }

  search(term: string): void {
    this.searchTerms.next(term);
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
    this.activePanel = idx + 1;
  }

  private clickCol(col: FormArray, i: number) {
    this.selectedIndex = i;
    this.selectedColumn = col;
  }

  private isSelectedCol(col) {
    if (col !== this.selectedColumn) {
      return false;
    }
    return true;
  }

  private initColumn(): FormGroup {
    return this.fb.group({
      parts: this.fb.array([], Validators.minLength(1)),
    });
  }

  onDrop(args) {
    this.newProjectForm.controls['parts']['controls'].map((el, idx: number) => {
      el['controls']['id'].setValue(idx);
      return el;
    })
  }

  initPartForm(part: Part) {
    return this.fb.group({
      name: [part.name, Validators.required],
      order: [this.selectedIndex, Validators.required],
      ice_name: [part.ice_name, Validators.required],
      ice_id: [part.ice_id, Validators.required],
      errors: [[], Validators.maxLength(0)]
    });
  }

  private addColumn($event) {
    const control = <FormArray>this.newProjectForm.controls['parts']
    control.push(this.initColumn());
    this.onDrop($event);
  }

  private submit() {
    // Should contain a call to the project service and upload
    this.combinatorial = <Combinatorial>this.newProjectForm.value;
    this.combinatorial.parts = this.combinatorial.parts.map(res => {
      return res['parts'];
    })
    this.combinatorialService.create(this.combinatorial)
                       .subscribe(
                          res => {
                            this.router.navigate(['/combinatorial', res.id]);
                          },
                          err => {
                            console.log(err);
                          });

  }
}
