export const ERROR_MESSAGES = {
    required: (fieldName: string) => `${fieldName} requerido.`,
    minlength: (fieldName: string, error: any) =>
      `minimo ${error.requiredLength} caracteres.`,
    maxlength: (fieldName: string, error: any) =>
      `maximo ${error.requiredLength} caracteres.`,
    min: (fieldName: string, error: any) => {
        return `${fieldName} minimo ${error.min}`;
    },
    arrayMinLength: (fieldName: string, error: any) => {
        return `minimo ${error.requiredLength} ${fieldName}`;
    }
  } as const;
  
  export const RESPONSE_MESSAGE = {
    ITEM_CREATED: 'Articulo creado con éxito',
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
    [ERROR_CODES.CONFLICT]: 'El articulo ya existe.',
    [ERROR_CODES.SERVER_ERROR]: 'Error en el servidor, intenta más tarde.',
  } as const;
  
  
  export const FIELD_NAMES = {
    ITEM_NAME: ['name', 'nombre'],
    ITEM_DESCRIPTION: ['description', 'descripción'],
    ITEM_PRICE: ['price', 'precio'],
    ITEM_BRAND: ['brand', 'marca'],
    ITEM_STOCK: ['stock', 'cantidad'],
    ITEM_CATEGORIES: ['categories', 'categorias'],
  } as const;
  
  export const GENERIC_ERROR_MESSAGE = 'Error al crear la marca';