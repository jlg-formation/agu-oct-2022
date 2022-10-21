import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input()
  autofocusMode = 'noselect';

  @Output()
  empty = new EventEmitter();

  constructor(private elt: ElementRef<HTMLElement>) {
    console.log('directive autofocus');
  }
  ngOnInit(): void {
    if (this.elt.nativeElement instanceof HTMLInputElement) {
      this.elt.nativeElement.addEventListener('input', () => {
        if (!(this.elt.nativeElement instanceof HTMLInputElement)) {
          return;
        }
        console.log(
          'this.elt.nativeElement.value: ',
          this.elt.nativeElement.value
        );

        if (this.elt.nativeElement.value === '') {
          setTimeout(() => {
            this.empty.emit();
          }, 0);
        }
      });
    }

    if (
      this.autofocusMode === 'select' &&
      this.elt.nativeElement instanceof HTMLInputElement
    ) {
      this.elt.nativeElement.select();
      return;
    }
    this.elt.nativeElement.focus();
  }
}
