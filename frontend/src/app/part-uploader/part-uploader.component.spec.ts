/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PartUploaderComponent } from './part-uploader.component';

let de: DebugElement;

describe('PartUploaderComponent', () => {
  let component: PartUploaderComponent;
  let fixture: ComponentFixture<PartUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#part'))
    component.part = {name: "test_name",
                      seqRecord: 1,
                      start_pos: 0,
                      end_pos: 150,
                      fwd_strand: true,
                      feats: [],
                      sequence: "ABC"}
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name of the part', () => {
    expect(de.nativeElement.value).toBe(component.part.name)
  });
});
