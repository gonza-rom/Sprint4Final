import { body } from 'express-validator'; 
// Importa la función 'body' del paquete 'express-validator' para validar y sanitizar datos enviados en el cuerpo de las solicitudes HTTP.

export const registerValidationRules = () => [
    // Exporta una función que devuelve un array de reglas de validación para los datos de registro.

    body('nombreSuperHeroe')
        // Aplica validaciones al campo 'nombreSuperHeroe' en el cuerpo de la solicitud.
        .isLength({ min: 3, max: 60 }).withMessage('La longitud de nombreSuperHeroe debe ser al menos de 3 caracteres y máximo 60 caracteres.')
        // Verifica que el valor tenga una longitud mínima de 3 y máxima de 60 caracteres.
        // Si no cumple, devuelve el mensaje de error especificado.
        .trim()
        // Elimina los espacios en blanco al inicio y al final del valor.
        .escape(),
        // Escapa caracteres especiales para prevenir ataques como la inyección de HTML o scripts.

    body('nombreReal')
        // Aplica validaciones al campo 'nombreReal' en el cuerpo de la solicitud.
        .isLength({ min: 3, max: 60 }).withMessage('La longitud de nombreReal debe ser al menos de 3 caracteres y máximo 60 caracteres.')
        // Verifica que el valor tenga una longitud mínima de 3 y máxima de 60 caracteres.
        // Si no cumple, devuelve el mensaje de error especificado.
        .trim()
        // Elimina los espacios en blanco al inicio y al final del valor.
        .escape(),
        // Escapa caracteres especiales para prevenir ataques.

    body('edad')
        // Aplica validaciones al campo 'edad' en el cuerpo de la solicitud.
        .isNumeric().withMessage('La edad debe ser un valor numérico.')
        // Verifica que el valor sea un número.
        .custom((value) => value > 0 && value <= 150).withMessage('La edad debe ser mayor a 0 y menor o igual a 150.')
        // Aplica una validación personalizada para asegurarse de que la edad esté entre 1 y 150.
        .toInt(),
        // Convierte el valor a un número entero.

    body('poderes')
        // Aplica validaciones al campo 'poderes' en el cuerpo de la solicitud.
        .isArray({ min: 1 }).withMessage('Los poderes deben estar en un array y no pueden estar vacíos.')
        // Verifica que el valor sea un array con al menos un elemento.
        .custom((array) => array.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60))
        // Valida que cada elemento del array sea una cadena de texto con longitud entre 3 y 60 caracteres.
        .withMessage('Cada elemento del array de poderes debe ser una cadena con al menos 3 caracteres y máximo 60 caracteres.'),

    body('aliados')
        // Aplica validaciones al campo 'aliados', que es opcional.
        .optional()
        // Permite que el campo no esté presente en la solicitud.
        .isArray().withMessage('Los aliados deben estar en un array.')
        // Si está presente, verifica que sea un array.
        .custom((array) => array.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60))
        // Valida que cada elemento del array sea una cadena de texto con longitud entre 3 y 60 caracteres.
        .withMessage('Cada elemento del array de aliados debe ser una cadena con al menos 3 caracteres y máximo 60 caracteres.'),

    body('enemigos')
        // Aplica validaciones al campo 'enemigos', que es opcional.
        .optional()
        // Permite que el campo no esté presente en la solicitud.
        .isArray().withMessage('Los enemigos deben estar en un array.')
        // Si está presente, verifica que sea un array.
        .custom((array) => array.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60))
        // Valida que cada elemento del array sea una cadena de texto con longitud entre 3 y 60 caracteres.
        .withMessage('Cada elemento del array de enemigos debe ser una cadena con al menos 3 caracteres y máximo 60 caracteres.')
];
