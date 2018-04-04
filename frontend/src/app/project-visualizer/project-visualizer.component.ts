import { Component, OnInit, Input, Pipe, PipeTransform, OnChanges, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../project'

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  // This is pretty horific in terms of security, so change when possible
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-project-visualizer',
  templateUrl: './project-visualizer.component.html',
  styleUrls: ['./project-visualizer.component.scss']
})
export class ProjectVisualizerComponent implements OnInit, OnChanges {
  @Input() project: Project;
  url: string;
  toggle = false; // this is to reload the iframe when project is changed

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.vectorURL();
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    this.vectorURL();
  }

  vectorURL() {
    this.toggle = false;
    this.url = 'https://ice.ebdrup.biosustain.dtu.dk'
    this.url += '/static/swf/vv/VectorViewer.swf?entryId='
    this.url += this.project.ice_id;
    this.url += '&sessionId=' + localStorage.getItem('ice_token');
    this.toggle = true;
  }

  projectChange() {
  }

  resize($ev: Event) {
    const el: HTMLIFrameElement = <HTMLIFrameElement>$ev.srcElement;
    el.height = '1000px';
    el.width = '100%';
  }

}
