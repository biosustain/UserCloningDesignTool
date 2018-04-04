import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-primer-detail',
  templateUrl: './primer-detail.component.html',
  styleUrls: ['./primer-detail.component.scss']
})
export class PrimerDetailComponent implements OnInit {
  @Input() primers;
  constructor() { }

  ngOnInit() {
  }

}
