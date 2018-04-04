import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Part } from '../part';
import { PartService } from '../part.service';

@Component({
  selector: 'app-part-search',
  templateUrl: './part-search.component.html',
  styleUrls: ['./part-search.component.css']
})
export class PartSearchComponent implements OnInit {
  @Input() parts: Observable<Part[]>;
  @Output()
  searchEvent: EventEmitter<Observable<Part[]>> = new EventEmitter();

  private searchTerms = new BehaviorSubject<string>('');

  constructor(private partService: PartService) { }

  ngOnInit() {
    this.parts = this.searchTerms
                          .debounceTime(300)
                          .distinctUntilChanged()
                          .switchMap(term => this.partService.search(term))
                          .catch(error => {
                            console.log(error);
                            return Observable.of<Part[]>([]);
                          });

    this.searchEvent.emit(this.parts);
  }

  search(term: string): void {
      this.searchTerms.next(term);
    }
}
