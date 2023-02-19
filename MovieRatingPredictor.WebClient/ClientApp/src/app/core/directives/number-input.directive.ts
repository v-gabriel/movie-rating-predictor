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
        //var value: string | null = event.data as string;
        //console.log('value', value);
        //console.log('elVa', ref.nativeElement.value);
        var value = ref.nativeElement.value;
        //var prevValue = control.control?.value as string;

        if (value.match(NUM_REG_EXP)) {
          // if (prevValue.match(NUM_REG_EXP)) {
          //   value = prevValue + value;
          // }
          if (value[0] === '0') {
            value = null;
          }
          control.control?.setValue(value);
        } else {
          // if (prevValue.match(NUM_REG_EXP)) {
          //   control.control?.setValue(prevValue);
          // } else {
          control.control?.setValue(null);
          //}
        }
      }
    });
  }
}
