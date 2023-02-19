import { AbstractControl } from '@angular/forms';

export class ErrorMessageHelper {
  public static getErrorMessage(control: AbstractControl, controlName: string) {
    if (control.errors?.required) {
      return `${controlName} is required`;
    } else if (control.errors?.pattern) {
      return `Invalid pattern`;
    } else if (control.errors?.maxlength) {
      return `${controlName} must be under ${control.errors?.maxlength.requiredLength} characters`;
    } else if (control.errors?.minlength) {
      return `${controlName} must be at least ${control.errors?.maxlength.requiredLength} characters long`;
    } else if (control.errors?.max) {
      return `${controlName} must not be above ${control.errors?.max.max}`;
    } else if (control.errors?.min) {
      return `${controlName} must not be under ${control.errors?.min.min}`;
    }
    return '';
  }
}
