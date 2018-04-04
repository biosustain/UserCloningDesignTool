import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-amuser-settings',
  templateUrl: './amuser-settings.component.html',
  styleUrls: ['./amuser-settings.component.css']
})
export class AmuserSettingsComponent implements OnInit {
  @Input() settings: FormGroup;
  @Output() settingsChange = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  toggle($ev) {
    const control = this.settings.get('melting_temperature')
    if (control.disabled && $ev.value === 'manual') {
      control.enable()
    } else if (!control.disabled && !($ev.value === 'manual')) {
      control.disable()
    }
  }
}
