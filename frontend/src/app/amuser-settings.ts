import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

export interface AmuserSetting {
  temperature_option: string;
  melting_temperature?: number;
  sodium_concentration: number;
  primer_concentration: number;
  circular_output: boolean;
  casette?: number;
}

export function createAmuserSettingForm(settings: AmuserSetting, fb: FormBuilder) {
  let disable_temp = true;

  if (settings.temperature_option == 'manual') {
    disable_temp = false;
  }

  const fg = fb.group({
    temperature_option: [settings.temperature_option, Validators.required],
    melting_temperature: [{value: settings.melting_temperature, disabled: disable_temp}, CustomValidators.range([40, 72])],
    primer_concentration: [settings.primer_concentration, CustomValidators.range([0.05, 5])],
    sodium_concentration: [settings.sodium_concentration, CustomValidators.range([10, 150])],
    circular_output: [settings.circular_output, Validators.required]
  })

  return fg;
}

export function createDefaultAmuserSettingForm(fb: FormBuilder) {
  const fg = fb.group({
    temperature_option: ['manual', Validators.required],
    melting_temperature: [{value: 50, disabled: false}, CustomValidators.range([40, 72])],
    primer_concentration: [0.05, CustomValidators.range([0.05, 5])],
    sodium_concentration: [50, CustomValidators.range([10, 150])],
    circular_output: [false, Validators.required]
  })
  return fg;
}
