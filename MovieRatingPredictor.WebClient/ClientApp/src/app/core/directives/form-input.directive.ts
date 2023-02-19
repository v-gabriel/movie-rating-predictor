import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName]',
})
export class FormInputDirective {
  constructor(ngControl: NgControl, elementRef: ElementRef) {
    if (ngControl.valueAccessor) {
      this.trimInput(ngControl);
      this.setTrimOnFocusLeaveListener(ngControl, elementRef);
    }
  }

  trimInput(ngCntrl: NgControl) {
    const VA = ngCntrl.valueAccessor;
    const originalVA = ngCntrl.valueAccessor!.registerOnChange;

    VA!.registerOnChange = (fn: (_: unknown) => void) => {
      return originalVA.call(VA, (value: unknown) => {
        return fn(typeof value === 'string' ? value.trim() : value);
      });
    };
  }

  setTrimOnFocusLeaveListener(ngCntrl: NgControl, elementRef: ElementRef) {
    const control = ngCntrl;
    const ref = elementRef;

    ref.nativeElement.addEventListener('focusout', (event: any) => {
      var value = control.control?.value;
      if (value && typeof value === 'string') {
        control.control?.setValue(value?.trim());
      }
    });
  }
}
