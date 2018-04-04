import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Part } from '../part';
import { PartService } from '../part.service';

@Component({
  selector: 'app-part-uploader',
  templateUrl: './part-uploader.component.html',
  styleUrls: ['./part-uploader.component.css']
})
export class PartUploaderComponent implements OnInit {
  public currentPart: Part;

  @Input() set selectedPart(part: Part) {
    this.currentPart = part;
    this.partChange.emit(part);
  };

  @Output() partChange: EventEmitter<Part> = new EventEmitter<Part>();

  get selectedPart(): Part {
    return this.currentPart;
  }

  constructor(
    private partService: PartService
  ) { }

  ngOnInit() {
  }

  createPart(): void {
    this.partService.create(this.currentPart)
                    .subscribe(
                      res => {
                        this.currentPart = res;
                      },
                      err => {
                        console.log(err);
                      }
                    );
  }

}
