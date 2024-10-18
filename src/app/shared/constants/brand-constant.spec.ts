import { ERROR_MESSAGES } from './brand-constant';

describe('ERROR_MESSAGES', () => {
  it('should return required error message', () => {
    const fieldName = 'Nombre';
    const expectedMessage = `${fieldName} requerido.`;
    expect(ERROR_MESSAGES.required(fieldName)).toBe(expectedMessage);
  });

  it('should return minlength error message', () => {
    const fieldName = 'Nombre';
    const error = { requiredLength: 5 };
    const expectedMessage = `minimo ${error.requiredLength} caracteres.`;
    expect(ERROR_MESSAGES.minlength(fieldName, error)).toBe(expectedMessage);
  });

  it('should return maxlength error message', () => {
    const fieldName = 'Nombre';
    const error = { requiredLength: 10 };
    const expectedMessage = `maximo ${error.requiredLength} caracteres.`;
    expect(ERROR_MESSAGES.maxlength(fieldName, error)).toBe(expectedMessage);
  });
});
