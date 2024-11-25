import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function adultValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value){
            return null;
        }

        const date = new Date(value);
        const now = new Date();

        const adult = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());

        return date <= adult ? null : { notAdult: true};
    }
}