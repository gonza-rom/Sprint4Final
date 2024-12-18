import express from 'express';
import { handleValidationErrors, processFormData } from './errorMiddleware.mjs';
import { registerValidationRules } from './validationRules.mjs';
import { obtenerSuperheroePorId } from '../services/superheroesService.mjs';

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



const router = express.Router();

router.get('/heroes/agregar', (req, res) => {
    res.render('agregar', { superheroe: {} }); // Asegúrate de pasar superheroe como objeto
});

router.get('/heroes/eliminar/:id', async (req, res) => {
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    res.render('eliminar', { superheroe });
});

router.get('/heroes/editar/:id', async (req, res) => {
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    res.render('agregar', { superheroe });
});


router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes', obtenerTodosLosSuperheroesController);


router.post('/heroes', processFormData, registerValidationRules(), handleValidationErrors, crearSuperheroeController);
router.put('/heroes/:id',editarSuperheroeController);
router.delete('/heroes/id/:id',eliminarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre',eliminarSuperheroePorNombreController);


export default router;