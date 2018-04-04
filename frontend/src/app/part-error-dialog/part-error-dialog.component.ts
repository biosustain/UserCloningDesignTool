import { Component, AfterViewInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-part-error-dialog',
  templateUrl: './part-error-dialog.component.html',
  styleUrls: ['./part-error-dialog.component.scss']
})
export class PartErrorDialogComponent implements AfterViewInit {
  displayedColumns = ['name', 'strand', 'genbankStart', 'end'];
  dataSource = new MatTableDataSource()
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.data = this.data['errorArray'];
    }, 200)
  }

  openInIce() {
    const url = 'https://ice.ebdrup.biosustain.dtu.dk/entry/' + this.data['ice_id']
    window.open(url, '_blank');
  }
}
