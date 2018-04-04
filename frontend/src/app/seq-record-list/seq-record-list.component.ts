import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SeqRecord } from '../seq-record';
import { SeqRecordService } from '../seq-record.service';

import { Part } from '../part';
import { PartService } from '../part.service';

import { SeqRecordSearchComponent } from '../seq-record-search/seq-record-search.component';

@Component({
  selector: 'app-seq-record-list',
  templateUrl: './seq-record-list.component.html',
  styleUrls: ['./seq-record-list.component.css']
})
export class SeqRecordListComponent implements OnInit {
  // seqrecords: SeqRecord[] = [];
  // seqrecordsSearch: Observable<SeqRecord>;
  // selectedSeqRecord: SeqRecord;

  // @ViewChild(SeqRecordSearchComponent) seqSearch: SeqRecordSearchComponent;

  // parts: Part[] = [];
  // partsSearch: Observable<Part>;
  // selectedPart: Part;


  // constructor(
  //   private seqRecordService: SeqRecordService,
  //   private partService: PartService
  // ) { }

  ngOnInit() {
  }

  // updateList($ev) {
  //   // Called when uploading new gb file
  //   this.seqSearch.search('');
  // }

  // searchClickSeq(seqRecord: SeqRecord) {
  //   console.log('Search click parent seq');
  //   this.selectedSeqRecord = seqRecord;
  //   this.selectedPart = {name: '',
  //                        seqRecord: seqRecord.id,
  //                        start_pos: 0,
  //                        end_pos: seqRecord.sequence.length,
  //                        feats: seqRecord.feats,
  //                        sequence: seqRecord.sequence};
  // }

  // searchClickPart(part: Part) {
  //   console.log('Search click parent part');
  //   this.selectedPart = part;
  //   this.seqRecordService.get(part.seqRecord)
  //                        .subscribe(res => {
  //                          this.selectedSeqRecord = res;
  //                        });
  // }
}
