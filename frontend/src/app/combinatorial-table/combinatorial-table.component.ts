import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { saveAs } from 'file-saver';

import { CombinatorialService } from '../combinatorial.service';
import { Combinatorial } from '../combinatorial';

@Component({
  selector: 'app-combinatorial-table',
  templateUrl: './combinatorial-table.component.html',
  styleUrls: ['./combinatorial-table.component.scss']
})
export class CombinatorialTableComponent implements OnInit {
  @Input() combinatorialObservable: Observable<Combinatorial[]>
  @Output() combinatorialObservableChange: EventEmitter<Combinatorial[]> = new EventEmitter()

  combinatorialList: Combinatorial[] = [];
  selectedCombinatorials: Combinatorial[] = [];
  combinatorialSubscription: Subscription;

  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Combinatorial name'},
    { name: 'description', label: 'Description'},
    { name: 'parts', label: 'Number of projects'},
    { name: 'actions', label: 'Actions'},
  ];

  hasData = false;

  constructor(
    private _combinatorialService: CombinatorialService
  ) { }

  ngOnInit() {
    this.combinatorialSubscription = this.combinatorialObservable.subscribe(
      res => {
        this.hasData = true;
        this.combinatorialList = res;
      }
    )
  }

  select(combinatorial: Combinatorial): void {
    /*
      Toggle select on a single combinatorial row and
      emit the new select list
    */
    const index = this.getCombinatorialIdx(combinatorial);
    if (index > -1) {
      this.selectedCombinatorials.splice(index, 1);
    } else {
      this.selectedCombinatorials.push(combinatorial);
    }
    this.combinatorialObservableChange.emit(this.selectedCombinatorials);
  }

  selectAll(checked: boolean): void {
    /*
      Toggle select on all projects and emit the new list
    */
    if (this.hasData) {
      if (checked) {
        this.selectedCombinatorials = [];
      } else {
        this.combinatorialList.map( project => {
          if (!this.isCombinatorialSelected(project)) {
            this.selectedCombinatorials.push(project);
          }
        })
      }
    }
    this.combinatorialObservableChange.emit(this.selectedCombinatorials);
  }

  isCombinatorialSelected(combinatorial: Combinatorial): boolean {
    /*
      Returns a boolean indicating whether the combinatorial
      is present in the selectedProjects list
    */
    return this.getCombinatorialIdx(combinatorial) > -1;
  }

  isAllSelected(): boolean {
    /*
      Returns true if ALL projects in the table are selected
    */
    return this.combinatorialList.every(el => this.isCombinatorialSelected(el));
  }

  isAnySelected(): boolean {
    /*
      Returns true if ANY project in the table is selected
    */
    return this.combinatorialList.some(el => this.isCombinatorialSelected(el));
  }

  getCombinatorialIdx(combinatorial: Combinatorial): number {
    /*
      Finds the id of the Combinatorial in the selected array
      based on the id of the Combinatorial itself.
    */
    return this.selectedCombinatorials.map(el => el.id).indexOf(combinatorial.id)
  }

  downloadCsv(combinatorial: Combinatorial) {
    this._combinatorialService.getCsv(combinatorial)
                        .subscribe(
                          res => {
                            const blob = new Blob([res], {type: 'text/csv'})
                            saveAs(blob, 'test.csv')
                          },
                          error => {
                            console.log('Error downloading the file.')
                          },
                          () => {}
                        );
  }

  blockEvent($ev) {
    
  }
}
