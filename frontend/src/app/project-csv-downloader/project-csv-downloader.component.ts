import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { saveAs } from 'file-saver';

import { ProjectService } from '../project.service';
import { Project } from '../project';

import { CombinatorialService } from '../combinatorial.service';
import { Combinatorial } from '../combinatorial';

@Component({
  selector: 'app-project-csv-downloader',
  templateUrl: './project-csv-downloader.component.html',
  styleUrls: ['./project-csv-downloader.component.scss']
})
export class ProjectCsvDownloaderComponent implements OnInit {
  projectObservable: Observable<Project[]>;
  combinatorialObservable: Observable<Combinatorial[]>
  selectedProjects: Project[] = [];
  selectedCombinatorials: Combinatorial[] = [];

  filteredTotal = 0;

  private projectSearchTerms = new BehaviorSubject<string>('');
  private combinatorialSearchTerms = new BehaviorSubject<string>('');

  constructor(
    private _projectService: ProjectService,
    private _combinatorialService: CombinatorialService
    ) { }

  ngOnInit() {
    this.projectObservable = this.projectSearchTerms
                    .distinctUntilChanged()
                    .switchMap(term => this._projectService.search(term))
                    .catch(error => {
                      console.log(error);
                      return Observable.of<Project[]>([]);
                    });

    this.combinatorialObservable = this.combinatorialSearchTerms
                    .distinctUntilChanged()
                    .switchMap(term => this._combinatorialService.search(term))
                    .catch(error => {
                      console.log(error);
                      return Observable.of<Combinatorial[]>([]);
                    });
  }

  searchProjects(term: string): void {
    this.projectSearchTerms.next(term);
  }

  searchCombinatorial(term: string): void {
    this.combinatorialSearchTerms.next(term);
  }

  projectChange($ev): void {
    /*
      Method called when a project is selected or
      deselected for download
    */
    this.selectedProjects = $ev;
  }

  combinatorialChange($ev): void {
    this.selectedCombinatorials = $ev;
  }

  canDownload(): boolean {
    return this.selectedProjects.length > 0;
  }

  downloadProjectCsv() {
    this._projectService.getCsv(this.selectedProjects)
                        .subscribe(
                          res => {
                            const blob = new Blob([res], {type: 'text/csv'})
                            saveAs(blob, 'test.csv')
                          },
                          error => {
                            console.log('Error downloading the file.')
                          },
                          () => {
                          }
                        );
  }

  page($ev) {

  }
}
