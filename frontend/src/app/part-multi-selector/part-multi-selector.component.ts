import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-part-multi-selector',
  templateUrl: './part-multi-selector.component.html',
  styleUrls: ['./part-multi-selector.component.scss']
})
export class PartMultiSelectorComponent implements OnInit {
  @Input() partArrs: FormArray;

  constructor() { }

  ngOnInit() {
  }

  removeColumn(idx: number) {
    this.partArrs.removeAt(idx);
  }

}
