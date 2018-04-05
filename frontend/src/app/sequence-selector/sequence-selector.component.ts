import { Component,
         OnInit,
         ElementRef,
         OnChanges,
         ViewChild,
         Input } from '@angular/core';
import { SeqRecord } from '../seq-record';
import { Project } from '../project';

import { Part } from '../part';

@Component({
  selector: 'app-sequence-selector',
  templateUrl: './sequence-selector.component.html',
  styleUrls: ['./sequence-selector.component.css']
})
export class SequenceSelectorComponent implements OnInit {
 //  @Input() seqRecord: SeqRecord;
 //  @Input() part: Part;
 //  @Input() project: Project;

 //  @ViewChild('sequence') element: ElementRef;

 //  private htmlElement; // Host HTMLElement
 //  private host; // D3 object referencing host dom object
 //  private svg; // SVG in which we will print our chart
 //  private margin; // Space between the svg borders and the actual chart graphic
 //  private width; // Component width
 //  private height; // Component height
 //  private fontSize = 12;

 //  private handleCircle;

 //  private tooltipGroup;

 //  // Virtual scroll is the actual coordinates shown in render
 //  // Render coordinates are relative to the virtual scroll
 //  private virtualScrollStart: number;
 //  private virtualScrollEnd: number;

 //  private markBar;
 //  private extraMarkBar;
 //  private dragBarStart;
 //  private dragBarEnd;

 //  private renderMarkBar;
 //  private renderFeatArr;
 //  private dispFeat;

 //  private controlGroup;
 //  private sequenceGroup;
 //  private markerGroup;
 //  private featureGroup;

 //  public sequence;
 //  private newSelection: number = null;
 //  private dragStart;

 //  constructor() { }

 //  ngOnChanges(): void {

 //    // Update graphical part
 //    this.htmlElement = this.element.nativeElement;
 //    this.host = D3.select(this.element.nativeElement);

 //    // Update shown sequence:
 //    if (this.seqRecord) {
 //      // Replace this with the entire sequence always being sent
 //      this.sequence = this.seqRecord.sequence;
 //      this.virtualScrollStart = this.part.start_pos;
 //      this.virtualScrollEnd = this.part.start_pos + 40;
 //      this.controlGroup.selectAll('*').remove();
 //      this.createFeatTooltip();
 //      this.insertCircleControl();
 //      this.updateMarker();
 //      this.drawSequence();
 //      this.featureGroup.selectAll('*').remove();
 //      this.SetupFeatures();
 //      this.drawFeatures();
 //      this.updateFeatures();
 //    };
 //  }

  ngOnInit() {
 //    this.setup();
 //    this.buildSVG();
 //    this.setupGroups();
 //    this.insertMarker();
 //    this.insertScrollControl();
  }

 //  private setup(): void {
 //    this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
 //    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
 //    this.height = this.width / 2;
 //  }

 //  private buildSVG(): void {
 //    this.host.html('');
 //    this.svg = this.host.append('svg')
 //                        .attr('width', this.width + this.margin.left + this.margin.right)
 //                        .attr('height', this.height + this.margin.top + this.margin.bottom)
 //                        .append('g')
 //                        .attr('transform', 'translate(' + 0 + ',' + this.height / 2 + ')');
 //  }

 //  private setupGroups(): void {
 //    this.controlGroup = this.svg.append('g');
 //    this.sequenceGroup = this.svg.append('g');
 //    this.markerGroup = this.svg.append('g');
 //    this.featureGroup = this.svg.append('g')
 //                                .classed('features', true);
 //    this.tooltipGroup = this.featureGroup.append('g')
 //                            .classed('tooltip', true);
 //  }

 //  private createFeatTooltip() {
 //    this.seqRecord.feats.map(function(feat) {
 //      Object.keys(feat.qualifiers).forEach(key => {
 //        feat['tooltip'] = key + ': ' + feat.qualifiers[key] + '\n';
 //      });
 //    });
 //  }

 //  /*
 //   * Setup of the virtual scroll
 //   */
 //  private newVirtualScrollIdx(newId: number): number {
 //    if (newId < 0) {
 //      newId = this.sequence.length + newId;
 //    } else {
 //      newId = newId % this.seqRecord.sequence.length;
 //    }
 //    return newId;
 //  }

 //  private updateCircleControl() {
 //    const rad = (this.virtualScrollStart * 2 * Math.PI) / this.sequence.length;

 //    D3.select(this.handleCircle)
 //      .enter();
 //      // .attr('cx', function(d) {return d.x;})
 //      // .attr('cy', function(d) {return d.y;});
 //  }

 //  private insertCircleControl() {
 //    const circumference_r = 50;

 //    const self = this;

 //    const dragFunc = function(d) {
 //      const d_from_origin = Math.sqrt(Math.pow(D3.event.x, 2) + Math.pow(D3.event.y, 2));
 //      const alpha = Math.acos(D3.event.x / d_from_origin);

 //      const x = circumference_r * Math.cos(alpha);
 //      const y = D3.event.y < 0 ? -circumference_r * Math.sin(alpha) : circumference_r * Math.sin(alpha);
 //      let rad = Math.atan2(x, -y);

 //      if (rad < 0) {
 //        rad += 2 * Math.PI;
 //      }
 //      const newStart = Math.round(rad * self.sequence.length / (2 * Math.PI));
 //      self.virtualScrollStart = self.newVirtualScrollIdx(newStart);
 //      self.virtualScrollEnd = self.newVirtualScrollIdx(newStart + 40);
 //      D3.select(this)
 //        .transition()
 //        // I have no idea why this works, but it makes the arc dragable. Please don't modify.
 //        .attrTween('d', function(d) {const newArc = <D3.DefaultArcObject>{startAngle: 0,
 //                                                   endAngle: 2};
 //                                     return function(t) { return arcControl(newArc); };
 //                                   });

 //      self.drawSequence();
 //      self.updateMarker();
 //      self.updateFeatures();
 //    };

 // // @param factory An interpolator factory which is evaluated
 // // for each selected element, in order, being passed the current datum (d),
 // // the current index (i), and the current group (nodes),
 // // with this as the current DOM element.
 // // The interpolator factory returns a string interpolator,
 // // which takes as its argument eased time t,
 // // typically in the range [0, 1] and returns the interpolated string.

 //    const drag = D3.drag()
 //                 .on('drag', dragFunc);

 //    const controlCircle = this.controlGroup.attr('transform', 'translate(' + [this.width - circumference_r + 15, 0] + ')');

 //    const arc = D3.arc()
 //                .innerRadius(circumference_r - 5)
 //                .outerRadius(circumference_r + 5)
 //                .startAngle(0)
 //                .endAngle(2 * Math.PI);


 //    const mainCircle = controlCircle.append('path')
 //                                  .attr('d', arc)
 //                                  .attr('style', 'opacity: 0.5');

 //    const rad = (this.virtualScrollStart * 2 * Math.PI) / this.sequence.length;

 //    const handle = [{
 //      x: Math.cos(rad),
 //      y: Math.sin(rad)
 //    }];

 //    const tau = Math.PI * 2;

 //    const arcControl = D3.arc()
 //                       .innerRadius(circumference_r - 5)
 //                       .outerRadius(circumference_r + 5)
 //                       .startAngle((d) => {return self.virtualScrollStart / self.sequence.length * tau; })
 //                       .endAngle((d) => {return self.virtualScrollEnd / self.sequence.length * tau; });

 //    this.handleCircle = controlCircle// .selectAll('g')
 //                                     // .data(this)
 //                                     // .enter()
 //                                     .append('path')
 //                                     .attr('d', arcControl)
 //                                     .call(drag);
 //    this.updateCircleControl();
 //  }

 //  private insertScrollControl() {
 //    const controlFunction = (val) => {
 //      this.virtualScrollStart = this.newVirtualScrollIdx(this.virtualScrollStart + val);
 //      this.virtualScrollEnd = this.newVirtualScrollIdx(this.virtualScrollEnd + val);
 //      this.drawSequence();
 //      this.updateMarker();
 //      this.updateFeatures();
 //    };

 //    // this.controlGroup
 //    //     .append('text')
 //    //     .attr('x', 100)
 //    //     .attr('y', -100)
 //    //     .text('+')
 //    //     .on('click', () => {
 //    //       controlFunction(20);
 //    //     })

 //    // this.controlGroup
 //    //     .append('text')
 //    //     .attr('x', 0)
 //    //     .attr('y', 150)
 //    //     .text('-')
 //    //     .on('click', () => {
 //    //       controlFunction(-20);
 //    //     })
 //  }

 //  /*
 //   * Draw sequence slice
 //   */
 //  private getSequenceForRender() {
 //    // Slice the sequence to display
 //    let sliceSeq;
 //    if (this.virtualScrollStart < this.virtualScrollEnd) {
 //      sliceSeq = this.seqRecord.sequence.slice(this.virtualScrollStart, this.virtualScrollEnd);
 //    } else {
 //      sliceSeq = this.seqRecord.sequence.slice(this.virtualScrollStart, this.seqRecord.sequence.length);
 //      sliceSeq += this.seqRecord.sequence.slice(0, this.virtualScrollEnd);
 //    }
 //    return sliceSeq.split('');
 //  }

 //  private drawSequence() {
 //    // Render the sequence
 //    const sliceSeq = this.getSequenceForRender();
 //    const text = this.sequenceGroup.selectAll('text')
 //                                 .data(sliceSeq);

 //    text.enter()
 //        .append('text')
 //        .attr('x', (d, i) => {return i * this.fontSize; })
 //        .attr('dy', '.35em')
 //        .attr('font-family', 'Courier New')
 //        .merge(text)
 //        .text(function(d) {
 //          return d;
 //        })
 //        // .on('click', (d, i) => {
 //        //   this.seqRecord.start_pos = i+1;
 //        // })
 //        .exit()
 //        .remove();
 //  }

 //  /*
 //   * Insert marker for start and stop positions
 //   */
 //  private updateMarker() {
 //    this.renderMarkBar = [0, 0];
 //    this.renderMarkBar[0] = this.coorToRelative(this.part.start_pos);
 //    this.renderMarkBar[1] = this.coorToRelative(this.part.end_pos);

 //    if (this.coorInRender(this.renderMarkBar)) {
 //      let firstCoor = Math.max(0, this.renderMarkBar[0]);
 //      if (this.renderMarkBar[0] > this.renderMarkBar[1]) {
 //        firstCoor = 0;
 //        if (this.renderMarkBar[0] < 40) {
 //          this.extraMarkBar.attr('x', this.renderMarkBar[0] * this.fontSize - 6)
 //                           .attr('width', (40 - this.renderMarkBar[0]) * this.fontSize - 6);
 //        }
 //      } else {
 //        this.extraMarkBar.attr('width', 0);
 //      }

 //      let secondCoor = Math.min(this.renderMarkBar[1] - firstCoor, 40 - firstCoor);
 //      if (this.renderMarkBar[0] === this.renderMarkBar[1]) {
 //        firstCoor = 0;
 //        secondCoor = 40;
 //      }
 //      this.markBar.attr('x', firstCoor * this.fontSize - 6)
 //                  .attr('width', secondCoor * this.fontSize);

 //      this.dragBarStart.attr('x', this.renderMarkBar[0] * this.fontSize - 6)
 //                       .attr('width', 6);

 //      this.dragBarEnd.attr('x', this.renderMarkBar[1] * this.fontSize - 6)
 //                     .attr('width', 6);

 //      if (this.renderMarkBar[1] > 40) {
 //        this.dragBarEnd.attr('width', 0);
 //      }
 //    } else {
 //      this.markBar.attr('width', 0);

 //      this.extraMarkBar.attr('width', 0);

 //      this.dragBarStart.attr('width', 0);

 //      this.dragBarEnd.attr('width', 0);
 //    }
 //  }

 //  private insertMarker() {
 //    // Drag functions
 //    const StartDragResize = () => {
 //      const newX = newPos(D3.event.x);
 //      let newId = newX / this.fontSize;
 //      if (newId < 0 ) {
 //        newId = -0.5;
 //      };

 //      const newRendStart = 0.5 + this.virtualScrollStart + newId;
 //      this.part.start_pos = newRendStart % this.sequence.length;

 //      this.updateMarker();
 //    };

 //    const EndDragResize = () => {
 //      const newX = newPos(D3.event.x);
 //      let newId = newX / this.fontSize;
 //      if (newId < 0 ) {
 //        newId = -0.5;
 //      }
 //      const newRendEnd = 0.5 + this.virtualScrollStart + newId;
 //      let res = newRendEnd % this.sequence.length;
 //      if (res === 0) {
 //        res = this.sequence.length;
 //      }
 //      this.part.end_pos = res;

 //      this.updateMarker();
 //    };

 //    const dragStart = D3.drag()
 //                      .subject(Object)
 //                      .on('drag', StartDragResize);

 //    const dragEnd = D3.drag()
 //                    .subject(Object)
 //                    .on('drag', EndDragResize);

 //    const newPos = (coor) => {
 //      return Math.round(coor / this.fontSize) * this.fontSize + 6;
 //    };

 //    this.markBar = this.markerGroup.append('rect')
 //            .attr('y', 0)
 //            .attr('height', 12)
 //            .attr('fill', 'lightblue')
 //            .attr('fill-opacity', 0.5);

 //    this.extraMarkBar = this.markerGroup.append('rect')
 //            .attr('y', 0)
 //            .attr('height', 12)
 //            .attr('fill', 'lightblue')
 //            .attr('fill-opacity', 0.5);

 //    this.dragBarStart = this.markerGroup.append('rect')
 //            .attr('id', 'dragStart')
 //            .attr('y', 0)
 //            .attr('height', 12)
 //            .attr('fill', 'green')
 //            .call(dragStart);

 //    this.dragBarEnd = this.markerGroup.append('rect')
 //        .attr('id', 'dragEnd')
 //        .attr('y', 0)
 //        .attr('height', 12)
 //        .attr('fill', 'red')
 //        .call(dragEnd);
 //  }


 //  /*
 //   * Draw features
 //   */
 //  private SetupFeatures() {
 //    const numLayers = this.findNumOfLayers();
 //    this.renderFeatArr = this.layerFeatures(this.seqRecord.feats, numLayers);
 //  }

 //  private findNumOfLayers(): number {
 //    let curNumLayers = 0;
 //    if (this.seqRecord.feats.length === 1) {
 //      curNumLayers = 1;
 //    } else if (this.seqRecord.feats.length > 1) {
 //      const start_arr = this.seqRecord.feats.map(function(item) {return [item.start_pos, 1]; });
 //      const end_arr = this.seqRecord.feats.map(function(item) {return [item.end_pos, -1]; });
 //      const sort_arr = start_arr.concat(end_arr);

 //      sort_arr.sort(function(a, b) {
 //        if (a['start_pos'] === b['start_pos']) {
 //          return 0;
 //        } else {
 //          return (a['start_pos'] < b['start_pos']) ? -1 : 1;
 //        }
 //      });

 //      const cumsum = [sort_arr[0][1]];
 //      for (let i = 1; i < sort_arr.length; i++) {
 //        cumsum[i] = cumsum[i - 1] + sort_arr[i][1];
 //      }
 //      curNumLayers = Math.max.apply(Math, cumsum);
 //    };
 //    return curNumLayers;
 //  }

 //  private layerFeatures(feats, numLayers) {
 //    const tau = Math.PI * 2;
 //    const layer_arr = Array(numLayers).fill(0);
 //    feats.forEach(feat => {
 //      for (let j = 0; j < layer_arr.length; j++) {
 //        if (feat.start_pos >= layer_arr[j]) {
 //          feat['layer'] = j + 1;
 //          layer_arr[j] = feat.end_pos;
 //          break;
 //        }
 //      }
 //    });
 //    return feats;
 //  }


 //  private updateFeatures() {
 //    this.dispFeat = this.dispFeat.map((disp, index) => {
 //      const feat = this.seqRecord.feats[index];
 //      const renderFeat = [this.coorToRelative(feat.start_pos),
 //                        this.coorToRelative(feat.end_pos)];
 //      if (this.coorInRender(renderFeat)) {
 //        // In case the feature goes from 0 to the end
 //        if (renderFeat[0] === renderFeat[1]) {
 //          renderFeat[0] = 0;
 //          renderFeat[1] = 40;
 //        }
 //        let firstCoor = Math.max(0, renderFeat[0]);
 //        if (renderFeat[0] > renderFeat[1]) {
 //          firstCoor = 0;
 //        }
 //        const secondCoor = Math.min(renderFeat[1] - firstCoor, 40 - firstCoor);
 //        disp.attr('x', firstCoor * this.fontSize - 4)
 //            .attr('width', Math.max(0, secondCoor * this.fontSize - 2));
 //      } else {
 //        disp.attr('width', 0);
 //      }
 //      return disp;
 //    });
 //  }

 //  private drawFeatures() {
 //    const self = this;
 //    const mouseOver = function(d, _self) {

 //      self.tooltipGroup.attr('transform', 'translate(' + [0, 0] + ')');

 //      self.tooltipGroup.append('rect')
 //                       .attr('id', 'r' + '-' + d.id)
 //                       .attr('width', d['tooltip'].length * 12)
 //                       .attr('height', 12)
 //                       .attr('y', -10)
 //                       .attr('x', -6)
 //                       .attr('fill', 'blue');

 //      self.tooltipGroup.append('text')
 //                       .attr('transform', 'translate(' + [0, 0] + ')')
 //                       .attr('id', 't' + '-' + d.id)
 //                       .text(d['tooltip']);

 //    };


 //    this.dispFeat = [];
 //    this.renderFeatArr.forEach((feat, index) => {
 //      this.dispFeat[index] = this.featureGroup.append('rect')
 //                                 .attr('height', 12)
 //                                 .attr('fill', 'green')
 //                                 .attr('y', feat.strand * (feat.layer * 24 + 24))
 //                                 .on('click', () => {
 //                                   this.part.start_pos = feat.start_pos;
 //                                   this.part.end_pos = feat.end_pos;
 //                                   this.part.name = this.seqRecord.name + '_' + feat.type;
 //                                   this.updateMarker();
 //                                 });

 //    });
 //  }


 //  /*
 //   * Utility functions
 //   */
 //  private coorToRelative(coor) {
 //    const width = this.sequence.length;
 //    const offset = coor - this.virtualScrollStart;
 //    const res = offset - (Math.floor(offset / width) * width);
 //    return res;
 //  }

 //  private coorInRender(coorSet) {
 //    if (coorSet[0] < 40 || coorSet[1] < 40) {
 //      return true;
 //    } else if (coorSet[1] > 40 && coorSet[0] > coorSet[1]) {
 //      return true;
 //    } else if (coorSet[0] === coorSet[1]) {
 //      return true;
 //    }
 //    return false;
 //  }
}
