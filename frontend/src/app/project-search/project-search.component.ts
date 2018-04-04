import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { saveAs } from 'file-saver';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Project } from '../project';
import { ProjectService } from '../project.service';

import { AmuserSetting } from '../amuser-settings';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {
  public projects: Observable<Project[]>;
  @Output()
  searchClickEvent: EventEmitter<any> = new EventEmitter();

  private csvProjects: Project[] = [];
  private searchTerms = new BehaviorSubject<string>('');

  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.searchTerms
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(term => this._projectService.search(term))
                        .catch((error: any) => {
                          console.log(error);
                          return Observable.of<Project[]>([]);
                        });
  }

  searchClick(project: Project): void {
    this.searchClickEvent.emit(project);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  changeCsvList(ev) {
    const index = this.csvProjects.indexOf(ev, 0);
    if (index > -1) {
      this.csvProjects.splice(index, 1);
    } else {
      this.csvProjects.push(ev)
    }
  }

  downloadCsv() {
    this._projectService.getCsv(this.csvProjects)
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


}
