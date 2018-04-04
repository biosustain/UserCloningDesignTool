import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

export function xsrfFactory() {
    return new CookieXSRFStrategy('_xsrf', 'X-CSRFToken');
}

@NgModule({
  providers: [
    {
      provide: XSRFStrategy,
      useFactory: xsrfFactory
    } 
  ]
})
export class CsrfStrategyModule { }
