export const ERROR_MESSAGES = {
    required: (fieldName: string) => `${fieldName} requerido.`,
    minlength: (fieldName: string, error: any) =>
      `minimo ${error.requiredLength} caracteres.`,
    maxlength: (fieldName: string, error: any) =>
      `maximo ${error.requiredLength} caracteres.`
  } as const;
  
  export const RESPONSE_MESSAGE = {
    BRAND_CREATED: 'Marca creada con éxito',
    UNEXPECTED_RESPONSE: 'Respuesta inesperada del servidor',
  };
  
  export const ERROR_CODES = {
    CONNECTION_REFUSED: 0,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  };
  
  export const ERROR_MESSAGES_BY_CODE = {
    [ERROR_CODES.CONNECTION_REFUSED]: 'Error de conexión, intenta más tarde.',
    [ERROR_CODES.BAD_REQUEST]: 'petición invalida, revisa los datos ingresados.',
    [ERROR_CODES.NOT_FOUND]: 'No se encontró la informacion requerida.',
    [ERROR_CODES.CONFLICT]: 'La marca ya existe.',
    [ERROR_CODES.SERVER_ERROR]: 'Error en el servidor, intenta más tarde.',
  } as const;
  
  
  export const FIELD_NAMES = {
    BRAND_NAME: 'name',
    BRAND_DESCRIPTION: 'description',
  } as const;
  
  export const GENERIC_ERROR_MESSAGE = 'Error al crear la marca';