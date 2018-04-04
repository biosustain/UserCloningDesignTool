import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DragulaService } from 'ng2-dragula';

import { PartErrorDialogComponent } from '../part-error-dialog/part-error-dialog.component';

import { Part } from '../part'
import { IcePartService, PartService } from '../part.service';


// Wrapper to add splice method on formarray, which is needed for dragula to work.
class FormArrayWrapper {
  constructor(public fa: FormArray) {
  }

  get(index: number) {
    return this.fa.controls[index];
  }

  splice(start: number, deleteCount: number, ...items: any[]): any[] {
    const deleted = this.fa.controls.slice(start, start + deleteCount);

    for (let i = start; i < start + deleteCount; i++) {
      this.fa.removeAt(i);
    }

    for (let i = start, j = 0; j < items.length; i++ , j++) {
      this.fa.insert(i, items[j]);
    }

    return deleted;
  }
}

@Component({
  selector: 'app-part-selector',
  templateUrl: './part-selector.component.html',
  styleUrls: ['./part-selector.component.css']
})
export class PartSelectorComponent implements OnInit {
  @Input('PartForm') public PartForm: FormArray;
  @Input('title') public title: string;

  public dragableForm: FormArrayWrapper;

  private searchTerms = new BehaviorSubject<string>('');
  searchClickEvent: EventEmitter<any> = new EventEmitter();
  private searchParts: Observable<Part[]>;

  private elem_num: number;

  constructor(
    private partService: PartService,
    private icePartService: IcePartService,
    private fb: FormBuilder,
    private dragulaService: DragulaService,
    public dialog: MatDialog
  ) {
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
  }

  ngOnInit() {
    this.searchParts = this.searchTerms
                          .debounceTime(300)
                          .distinctUntilChanged()
                          .switchMap(term => this.icePartService.search(term))
                          .catch(error => {
                            console.log(error);
                            return Observable.of<Part[]>([]);
                          });
    this.searchParts.subscribe();
    this.elem_num = this.PartForm.length;
    this.dragableForm = new FormArrayWrapper(this.PartForm);
  }

  openErrorDialog(partForm: FormGroup) {
    this.dialog.open(PartErrorDialogComponent, {
      data: {
        errorArray: partForm['part_errors'],
        ice_id: partForm.controls.ice_id.value,
        part_name: partForm.controls.ice_name.value
      }
    });
  }

  onDrop(args) {
    this.dragableForm.fa.controls.map((el, idx: number) => {
      el['controls']['order'].setValue(idx);
      return el;
    })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  addPart() {
    this.PartForm.push(this.initPartForm());
    this.elem_num += 1;
  }

  removePart(i: number) {
    // remove Part from the list
    this.elem_num -= 1;
    this.PartForm.removeAt(i);
  }

  selectPart(part: FormGroup, ice_part: Part) {
    // add Part to the list
    part.controls['name'].setValue(ice_part.name);
    part.controls['ice_id'].setValue(ice_part.ice_id);
    part.controls['ice_name'].setValue(ice_part.ice_name);
    part.controls['errors'].setValue(ice_part.errors);
    part['part_errors'] = ice_part.errors;
  }

  initPartForm() {
    return this.fb.group({
      name: ['', Validators.required],
      order: [this.elem_num, Validators.required],
      ice_id: ['', Validators.required],
      ice_name: ['', Validators.required],
      errors: [[], Validators.maxLength(0)]
    });
  }
}
