import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const value = control.value;

    if (!Array.isArray(value)) {

      return { arrayMinLength: { requiredLength: minLength, actualLength: 0 } };

    }

    return value.length >= minLength ? null : { arrayMinLength: { requiredLength: minLength, actualLength: value.length } };

  }; 
}