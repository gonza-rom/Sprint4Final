import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).render('agregar', {
            errors: errorMessages,
            superheroe: req.body, // Mantiene los datos del formulario
        });
    }
    next();
};


export const processFormData = (req, res, next) => {
    // Verifica si el encabezado Content-Type indica que proviene de un formulario HTML
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
        if (req.body.poderes) {
            req.body.poderes = req.body.poderes.split(',').map(p => p.trim());
        }
        if (req.body.aliados) {
            req.body.aliados = req.body.aliados.split(',').map(a => a.trim());
        }
        if (req.body.enemigos) {
            req.body.enemigos = req.body.enemigos.split(',').map(e => e.trim());
        }
    }
    next();
};
