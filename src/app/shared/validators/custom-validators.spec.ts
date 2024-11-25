import { FormControl } from '@angular/forms';
import { arrayMinLengthValidator } from './custom-validators';

describe('arrayMinLengthValidator', () => {
  it('should return null if the array has at least the minimum length', () => {
    const control = new FormControl(['item1', 'item2']);
    const validator = arrayMinLengthValidator(2);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return an error if the array has less than the minimum length', () => {
    const control = new FormControl(['item1']);
    const validator = arrayMinLengthValidator(2);
    const result = validator(control);
    expect(result).toEqual({ arrayMinLength: { requiredLength: 2, actualLength: 1 } });
  });

  it('should return an error if the control value is not an array', () => {
    const control = new FormControl('not an array');
    const validator = arrayMinLengthValidator(2);
    const result = validator(control);
    expect(result).toEqual({ arrayMinLength: { requiredLength: 2, actualLength: 0 } });
  });

  it('should return null if the control value is an empty array and minLength is 0', () => {
    const control = new FormControl([]);
    const validator = arrayMinLengthValidator(0);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return an error if the control value is an empty array and minLength is greater than 0', () => {
    const control = new FormControl([]);
    const validator = arrayMinLengthValidator(1);
    const result = validator(control);
    expect(result).toEqual({ arrayMinLength: { requiredLength: 1, actualLength: 0 } });
  });
});