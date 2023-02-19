import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NUM_REG_EXP } from '../constants';

@Directive({
  selector: '[number]',
})
export class NumberInputDirective {
  constructor(ngControl: NgControl, elementRef: ElementRef) {
    if (ngControl.valueAccessor) {
      this.setInputChangeListener(ngControl, elementRef);
    }
  }

  setInputChangeListener(ngCntrl: NgControl, elementRef: ElementRef) {
    const control = ngCntrl;
    const ref = elementRef;

    ref.nativeElement.addEventListener('input', (event: any) => {
      if (event.data && typeof event.data === 'string') {
        var value = ref.nativeElement.value;

        if (value.match(NUM_REG_EXP)) {
          if (value[0] === '0') {
            value = null;
          }
          control.control?.setValue(value);
        } else {
          control.control?.setValue(null);
        }
      }
    });
  }
}
