export const ERROR_MESSAGES = {
    required: (fieldName: string) => `${fieldName} requerido.`,
    minlength: (fieldName: string, error: any) =>
      `minimo ${error.requiredLength} caracteres.`
  } as const;
  
  export const RESPONSE_MESSAGE = {
    CATEGORY_CREATED: 'Categoria creada con éxito',
    UNEXPECTED_RESPONSE: 'Respuesta inesperada del servidor',
  };
  
  export const ERROR_CODES = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  };
  
  export const ERROR_MESSAGES_BY_CODE = {
    [ERROR_CODES.BAD_REQUEST]: 'petición invalida, revisa los datos ingresados.',
    [ERROR_CODES.CONFLICT]: 'La categoría ya existe.',
    [ERROR_CODES.SERVER_ERROR]: 'Error en el servidor, intenta más tarde.',
  } as const;
  
  
  export const FIELD_NAMES = {
    CATEGORY_NAME: 'name',
    CATEGORY_DESCRIPTION: 'description',
  } as const;
  
  export const GENERIC_ERROR_MESSAGE = 'Error al crear la categoría';
  
  type ErrorMessageKeys = keyof typeof ERROR_MESSAGES;
  type ErrorCodeKeys = keyof typeof ERROR_MESSAGES_BY_CODE;
  type FieldNameKeys = keyof typeof FIELD_NAMES;