import { USER_ERROR_MESSAGES } from "./user-constant";

describe("ERROR_MESSAGES", () => {
    it("should return required error message", () => {
        const fieldName = "Nombre";
        const expectedMessage = `${fieldName} requerido.`;
        expect(USER_ERROR_MESSAGES.required(fieldName)).toBe(expectedMessage);
    });
    
    it("should return minlength error message", () => {
        const fieldName = "Nombre";
        const error = { requiredLength: 5 };
        const expectedMessage = `minimo ${error.requiredLength} caracteres.`;
        expect(USER_ERROR_MESSAGES.minlength(fieldName, error)).toBe(expectedMessage);
    });
    
    it("should return maxlength error message", () => {
        const fieldName = "Nombre";
        const error = { requiredLength: 10 };
        const expectedMessage = `maximo ${error.requiredLength} caracteres.`;
        expect(USER_ERROR_MESSAGES.maxlength(fieldName, error)).toBe(expectedMessage);
    });


    it("should return notAdult error message",() => {
        const fieldName = "edad";
        const error = { notAdult: true };
        const expectedMessage = "debe ser mayor de 18";
        expect(USER_ERROR_MESSAGES.notAdult(fieldName, error)).toBe(expectedMessage);
    });

    it("should return pattern error message",() => {
        const fieldName = "telefono";
        const error = { pattern: true };
        const expectedMessage = `formato de telefono invalido`;
        expect(USER_ERROR_MESSAGES.pattern(fieldName, error)).toBe(expectedMessage);
    });

    it("should return email error message",() => {
        const fieldName = "correo";
        const error = { email: true };
        const expectedMessage = `formato de correo invalido`;
        expect(USER_ERROR_MESSAGES.email(fieldName, error)).toBe(expectedMessage);
    });
});