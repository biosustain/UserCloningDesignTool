import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SeqRecord } from '../seq-record';
import { SeqRecordService } from '../seq-record.service';

@Component({
  selector: 'app-seq-record-search',
  templateUrl: './seq-record-search.component.html',
  styleUrls: ['./seq-record-search.component.css']
})
export class SeqRecordSearchComponent implements OnInit {
  @Input() seqrecords: Observable<SeqRecord[]>;
  @Output()
  searchClickEvent: EventEmitter<any> = new EventEmitter();

  private searchTerms = new BehaviorSubject<string>('');

  constructor(private seqRecordService: SeqRecordService) { }

  ngOnInit() {
    this.seqrecords = this.searchTerms
                          .debounceTime(300)
                          .distinctUntilChanged()
                          .switchMap(term => this.seqRecordService.search(term))

                          .catch(error => {
                            console.log(error);
                            return Observable.of<SeqRecord[]>([]);
                          });
  }

  searchClick(seqRecord: SeqRecord): void {
    this.searchClickEvent.emit(seqRecord);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
