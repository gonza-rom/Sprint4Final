import express from 'express';
// Importa el módulo 'express' para manejar rutas y solicitudes HTTP.

import { handleValidationErrors, processFormData } from './errorMiddleware.mjs';
// Importa middlewares personalizados:
// - 'handleValidationErrors': Maneja los errores de validación.
// - 'processFormData': Procesa los datos enviados en el cuerpo de la solicitud.

import { registerValidationRules } from './validationRules.mjs';
// Importa las reglas de validación definidas para los datos de registro de superhéroes.

import { obtenerSuperheroePorId } from '../services/superheroesService.mjs';
// Importa una función del servicio que obtiene un superhéroe por su ID desde la capa de lógica de negocio.

import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';
// Importa los controladores que manejan las diferentes acciones relacionadas con los superhéroes.

const router = express.Router();
// Crea un enrutador de Express para definir rutas específicas para la entidad 'superhéroes'.

// Ruta para renderizar la página de agregar un superhéroe.
router.get('/heroes/agregar', (req, res) => {
    res.render('agregar', { superheroe: {} });
    // Renderiza la vista 'agregar' con un objeto vacío de superhéroe.
    // Esto permite usar la misma vista para agregar y editar superhéroes.
});

// Ruta para renderizar la página de eliminar un superhéroe por ID.
router.get('/heroes/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    // Extrae el ID del superhéroe de los parámetros de la URL.
    const superheroe = await obtenerSuperheroePorId(id);
    // Obtiene los datos del superhéroe correspondiente llamando al servicio.
    res.render('eliminar', { superheroe });
    // Renderiza la vista 'eliminar' pasando los datos del superhéroe.
});

// Ruta para renderizar la página de edición de un superhéroe por ID.
router.get('/heroes/editar/:id', async (req, res) => {
    const { id } = req.params;
    // Extrae el ID del superhéroe de los parámetros de la URL.
    const superheroe = await obtenerSuperheroePorId(id);
    // Obtiene los datos del superhéroe correspondiente llamando al servicio.
    res.render('agregar', { superheroe });
    // Renderiza la vista 'agregar', reutilizándola para edición, pasando los datos del superhéroe.
});

// Ruta para obtener todos los superhéroes mayores de 30 años.
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
// Llama al controlador que filtra y devuelve superhéroes mayores de 30 años.

// Ruta para obtener un superhéroe específico por ID.
router.get('/heroes/:id', obtenerSuperheroePorIdController);
// Llama al controlador que obtiene un superhéroe por su ID.

// Ruta para buscar superhéroes por un atributo y su valor.
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
// Llama al controlador que busca superhéroes basándose en un atributo específico (como nombre, edad, etc.) y su valor.

// Ruta para obtener todos los superhéroes.
router.get('/heroes', obtenerTodosLosSuperheroesController);
// Llama al controlador que devuelve la lista completa de superhéroes.

// Ruta para crear un nuevo superhéroe.
router.post('/heroes', processFormData, registerValidationRules(), handleValidationErrors, crearSuperheroeController);
// Define una ruta POST para agregar un superhéroe:
// - 'processFormData': Procesa los datos enviados.
// - 'registerValidationRules()': Aplica las reglas de validación.
// - 'handleValidationErrors': Maneja los errores de validación antes de pasar al controlador.
// - 'crearSuperheroeController': Controlador que guarda el nuevo superhéroe.

// Ruta para editar un superhéroe existente por ID.
router.put('/heroes/:id', editarSuperheroeController);
// Define una ruta PUT para actualizar un superhéroe existente, llamando al controlador correspondiente.

// Ruta para eliminar un superhéroe por ID.
router.delete('/heroes/id/:id', eliminarSuperheroePorIdController);
// Define una ruta DELETE para eliminar un superhéroe basándose en su ID.

// Ruta para eliminar un superhéroe por nombre.
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);
// Define una ruta DELETE para eliminar un superhéroe basándose en su nombre.

export default router;
// Exporta el enrutador para que pueda ser utilizado en el servidor principal.
