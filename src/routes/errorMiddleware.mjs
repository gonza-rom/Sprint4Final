// Importa el método validationResult de express-validator, que se utiliza para manejar y validar errores.
import { validationResult } from 'express-validator';

/**
 * Middleware para manejar errores de validación.
 * Si hay errores, renderiza una vista con los mensajes de error y los datos del formulario.
 * Si no hay errores, permite continuar al siguiente middleware o controlador.
 */
export const handleValidationErrors = (req, res, next) => {
    // Obtiene los errores de validación del objeto de la solicitud.
    const errors = validationResult(req);

    // Verifica si hay errores de validación.
    if (!errors.isEmpty()) {
        // Mapea los errores para obtener solo los mensajes.
        const errorMessages = errors.array().map(error => error.msg);

        // Renderiza la vista 'agregar' con los errores y los datos ingresados por el usuario.
        return res.status(400).render('agregar', {
            errors: errorMessages, // Lista de mensajes de error.
            superheroe: req.body   // Mantiene los datos del formulario para que no se pierdan.
        });
    }

    // Si no hay errores, pasa al siguiente middleware o controlador.
    next();
};

/**
 * Middleware para procesar los datos del formulario enviados por el usuario.
 * Convierte campos específicos (poderes, aliados, enemigos) en arreglos si están en formato de texto separado por comas.
 */
export const processFormData = (req, res, next) => {
    // Verifica si el encabezado Content-Type indica que los datos provienen de un formulario HTML.
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
        // Convierte el campo 'poderes' en un arreglo, separando los valores por comas y eliminando espacios adicionales.
        if (req.body.poderes) {
            req.body.poderes = req.body.poderes.split(',').map(p => p.trim());
        }

        // Convierte el campo 'aliados' en un arreglo.
        if (req.body.aliados) {
            req.body.aliados = req.body.aliados.split(',').map(a => a.trim());
        }

        // Convierte el campo 'enemigos' en un arreglo.
        if (req.body.enemigos) {
            req.body.enemigos = req.body.enemigos.split(',').map(e => e.trim());
        }
    }

    // Pasa al siguiente middleware o controlador.
    next();
};
