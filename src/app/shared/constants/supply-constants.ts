export const SUPPLY_ERROR_MESSAGES = {
    required: (fieldName: string) => `${fieldName} requerido.`,
    min: (fieldName: string, error: any) => {
        return `${fieldName} minimo ${error.min}`;
    },
  } as const;

export const SUPPLY_RESPONSE_MESSAGE = {
    SUPPLY_CREATED: 'Suministro añadido con éxito',
    UNEXPECTED_RESPONSE: 'Respuesta inesperada del servidor'
};

export const SUPPLY_ERROR_CODES = {
    CONNECTION_REFUSED: 0,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

export const SUPPLY_ERROR_MESSAGES_BY_CODE = {
    [SUPPLY_ERROR_CODES.CONNECTION_REFUSED]: 'Error de conexión, intenta más tarde.',
    [SUPPLY_ERROR_CODES.BAD_REQUEST]: 'petición invalida, revisa los datos ingresados.',
    [SUPPLY_ERROR_CODES.NOT_FOUND]: 'No se encontró la informacion requerida.',
    [SUPPLY_ERROR_CODES.SERVER_ERROR]: 'Error en el servidor, intenta más tarde.',
} as const;

export const SUPPLY_FIELD_NAMES = {
    SUPPLY_QUANTITY: ['quantity', 'cantidad'],
    SUPPLY_NEXT_SUPPLY_DATE: ['nextSupplyDate', 'fecha de proximo suministro'],
}

export const SUPPLY_GENERIC_ERROR_MESSAGE = 'Error al añadir suministro';
