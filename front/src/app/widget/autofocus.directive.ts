import { Directive } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  constructor() {
    console.log('directive autofocus');
  }
}
