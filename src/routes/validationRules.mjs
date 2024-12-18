import { body } from 'express-validator';

export const registerValidationRules = () => [
    body('nombreSuperHeroe')
        .isLength({ min: 3, max: 60 }).withMessage('La longitud de nombreSuperHeroe debe ser al menos de 3 caracteres y máximo 60 caracteres.')
        .trim()
        .escape(),

    body('nombreReal')
        .isLength({ min: 3, max: 60 }).withMessage('La longitud de nombreReal debe ser al menos de 3 caracteres y máximo 60 caracteres.')
        .trim()
        .escape(),

    body('edad')
        .isNumeric().withMessage('La edad debe ser un valor numérico.')
        .custom((value) => value > 0 && value <= 150).withMessage('La edad debe ser mayor a 0 y menor o igual a 150.')
        .toInt(),

    body('poderes')
        .isArray({ min: 1 }).withMessage('Los poderes deben estar en un array y no pueden estar vacíos.')
        .custom((array) => array.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60))
        .withMessage('Cada elemento del array de poderes debe ser una cadena con al menos 3 caracteres y máximo 60 caracteres.'),

    body('aliados')
        .optional()
        .isArray().withMessage('Los aliados deben estar en un array.')
        .custom((array) => array.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60))
        .withMessage('Cada elemento del array de aliados debe ser una cadena con al menos 3 caracteres y máximo 60 caracteres.'),

    body('enemigos')
        .optional()
        .isArray().withMessage('Los enemigos deben estar en un array.')
        .custom((array) => array.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60))
        .withMessage('Cada elemento del array de enemigos debe ser una cadena con al menos 3 caracteres y máximo 60 caracteres.')
];
