
export const CART_RESPONSE_MESSAGES = {
    ITEM_ADDED: 'Articulo añadido con éxito al carrito',
    UNEXPECTED_RESPONSE: 'Respuesta inesperada del servidor'
}


export const CART_ERROR_CODES = {
    CONNECTION_REFUSED: 0,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}

export const CART_ERROR_MESSAGES_BY_CODE = {
    [CART_ERROR_CODES.CONNECTION_REFUSED]: 'Error de conexión, intenta más tarde.',
    [CART_ERROR_CODES.BAD_REQUEST]: 'petición invalida, revisa los datos ingresados.',
    [CART_ERROR_CODES.UNAUTHORIZED]: 'No autorizado.',
    [CART_ERROR_CODES.FORBIDDEN]: 'No tienes permisos para realizar esta acción.',
    [CART_ERROR_CODES.NOT_FOUND]: 'No se encontró la informacion requerida.',
    [CART_ERROR_CODES.SERVER_ERROR]: 'Error en el servidor, intenta más tarde.',
}