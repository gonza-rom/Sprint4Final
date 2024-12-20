import {
    buscarSuperheroesPorAtributo,
    obtenerSuperheroePorId,
    obtenerSuperheroesMayoresDe30,
    obtenerTodosLosSuperheroes,
    crearSuperheroeService,
    editarSuperheroeService,
    eliminarSuperheroePorIdService,
    eliminarSuperheroePorNombreService
} from '../services/superheroesService.mjs';

import { renderizarListaSuperheroes, renderizarSuperheroe } from '../responseView.mjs';

/**
 * Controlador para obtener todos los superhéroes.
 * Responde con una lista de superhéroes en formato HTML o JSON según los encabezados de la solicitud.
 */
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        if (superheroes.length > 0) {
            // Verifica si el cliente espera una respuesta en HTML
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                res.render('dashboard', { superheroes }); // Renderiza la vista con los datos
            } else {
                res.json(renderizarListaSuperheroes(superheroes)); // Devuelve un JSON
            }
        } else {
            res.status(404).json({ mensaje: "No se encontraron superhéroes" }); // Respuesta si no hay datos
        }
    } catch (error) {
        console.error('Error al obtener todos los superhéroes:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener superhéroes', error: error.message });
    }
}

/**
 * Controlador para buscar superhéroes por un atributo específico.
 * @param {string} atributo - Atributo por el cual se realiza la búsqueda.
 * @param {string} valor - Valor del atributo.
 */
export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    try {
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length > 0) {
            res.send(renderizarListaSuperheroes(superheroes)); // Devuelve la lista renderizada
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        console.error('Error al buscar superhéroes:', error.message);
        res.status(500).json({ mensaje: 'Error al buscar superhéroes', error: error.message });
    }
}

/**
 * Controlador para obtener un superhéroe por su ID.
 */
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const id = req.params['id'];
        const superheroe = await obtenerSuperheroePorId(id);

        if (superheroe) {
            // Responde en HTML o JSON según los encabezados
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                res.render('superheroe', { superheroe });
            } else {
                res.json(renderizarSuperheroe(superheroe));
            }
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al obtener superhéroe por ID:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener superhéroe', error: error.message });
    }
}

/**
 * Controlador para obtener superhéroes mayores de 30 años.
 */
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.send(renderizarListaSuperheroes(superheroes)); // Devuelve la lista renderizada
    } catch (error) {
        console.error('Error al obtener superhéroes mayores de 30:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

/**
 * Controlador para crear un nuevo superhéroe.
 */
export async function crearSuperheroeController(req, res) {
    try {
        const heroe = req.body; // Datos del superhéroe enviados en el cuerpo de la solicitud
        const nuevoHeroe = await crearSuperheroeService(heroe);

        if (nuevoHeroe) {
            // Responde en HTML o JSON según los encabezados
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                res.render('nuevoSuperheroe', { nuevoHeroe });
            } else {
                res.status(201).json({
                    status: 'success',
                    message: 'Superhéroe creado con éxito',
                    data: nuevoHeroe,
                });
            }
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error en crearSuperheroeController:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'No se pudo crear el superhéroe',
        });
    }
}

/**
 * Controlador para editar un superhéroe existente.
 */
export async function editarSuperheroeController(req, res) {
    try {
        const superheroeId = req.params['id'];
        const superheroe = await editarSuperheroeService(superheroeId, req.body);

        if (superheroe) {
            // Redirige a la vista del superhéroe editado
            res.status(200).redirect(`/api/heroes/${superheroe.id}`);
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al editar superhéroe:', error.message);
        res.status(400).send({ mensaje: "Error al editar superhéroe", error: error.message });
    }
}

/**
 * Controlador para eliminar un superhéroe por su ID.
 */
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const superheroeId = req.params['id'];
        const superheroe = await eliminarSuperheroePorIdService(superheroeId);

        if (superheroe) {
            res.status(200).redirect(`/api/heroes`);
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al eliminar superhéroe por ID:', error.message);
        res.status(400).send({ mensaje: "Error al eliminar superhéroe por ID", error: error.message });
    }
}

/**
 * Controlador para eliminar un superhéroe por su nombre.
 */
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const superheroeNombre = req.params['nombre'];
        const superheroe = await eliminarSuperheroePorNombreService(superheroeNombre);
        res.status(200).send(renderizarSuperheroe(superheroe));
    } catch (error) {
        console.error('Error al eliminar superhéroe por nombre:', error.message);
        res.status(400).send({ mensaje: "Error al eliminar superhéroe por nombre", error: error.message });
    }
}
