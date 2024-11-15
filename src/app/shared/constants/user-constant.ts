export const USER_ERROR_MESSAGES = {
    required: (fieldName: string) => `${fieldName} requerido.`,
    minlength: (fieldName: string, error: any) =>
      `minimo ${error.requiredLength} caracteres.`,
    maxlength: (fieldName: string, error: any) =>
      `maximo ${error.requiredLength} caracteres.`,
    notAdult: (fieldName: string, error: any) => {
        return "debe ser mayor de 18";
    },
    email: (fieldName: string, error: any) => {
        return `formato de correo invalido`;
    },
    pattern: (fieldName: string, error: any) => {
        return `formato de telefono invalido`;
    }

} as const;

export const USER_RESPONSE_MESSAGE = {
    WAREHOUSE_ASSIS_USER_CREATED: 'Usuario auxiliar de bodega creado con éxito',
    CLIENT_USER_CREATED: 'Usuario cliente creado con éxito',
    UNEXPECTED_RESPONSE: 'Respuesta inesperada del servidor',
}

export const USER_ERROR_CODES = {
    CONNECTION_REFUSED: 0,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

export const USER_ERROR_MESSAGES_BY_CODE = {
    [USER_ERROR_CODES.CONNECTION_REFUSED]: 'Error de conexión, intenta más tarde.',
    [USER_ERROR_CODES.BAD_REQUEST]: 'petición invalida, revisa los datos ingresados.',
    [USER_ERROR_CODES.NOT_FOUND]: 'No se encontró la informacion requerida.',
    [USER_ERROR_CODES.CONFLICT]: 'El usuario ya existe.',
    [USER_ERROR_CODES.SERVER_ERROR]: 'Error en el servidor, intenta más tarde.',
} as const;

export const USER_FIELD_NAMES = {
    USER_NAME: ['name', 'nombre'],
    USER_LAST_NAME: ['lastName', 'apellido'],
    USER_IDENTITY_DOCUMENT: ['identityDocument', 'documento de identidad'],
    USER_PHONE: ['phone', 'teléfono'],
    USER_EMAIL: ['email', 'correo'],
    USER_PASSWORD: ['password', 'contraseña'],
    USER_BIRTH_DATE: ['birthDate', 'fecha de nacimiento'],
} as const;

export const GENERIC_ERROR_MESSAGE = 'Error al crear el usuario';