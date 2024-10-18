import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (Array.isArray(control.value) && control.value.length >= minLength) {
      return null; // No error
    }
    return { arrayMinLength: { requiredLength: minLength, actualLength: control.value.length } };
  };
}