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
import { renderizarListaSuperheroes, renderizarSuperheroe } from '../views/responseView.mjs';


export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        if (superheroes.length > 0) {
            // Verifica si la solicitud es para HTML o JSON
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                // Renderizar vista HTML
                res.render('dashboard', { superheroes });
            } else {
                // Enviar respuesta JSON
                res.json(renderizarListaSuperheroes(superheroes));
            }
        } else {
            res.status(404).json({ mensaje: "No se encontraron superhéroes" });
        }
    } catch (error) {
        console.error('Error al obtener todos los superhéroes:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener superhéroes', error: error.message });
    }
}


export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

    if (superheroes.length > 0) {
        res.send(renderizarListaSuperheroes(superheroes));
    } else {
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
}

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const id = req.params['id'];
        console.log(req.params['id']);

        const superheroe = await obtenerSuperheroePorId(id);

        if (superheroe) {
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                // Renderizar vista HTML
                res.render('superheroe', { superheroe });
            } else {
                // Enviar respuesta JSON
                res.json(renderizarSuperheroe(superheroe));
            }
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al obtener todos los superhéroes:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener superhéroes', error: error.message });
    }
    
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));
}

export async function crearSuperheroeController(req, res) {
    try {
        const heroe = req.body;
        const nuevoHeroe = await crearSuperheroeService(heroe);

        if (nuevoHeroe) {
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




export async function editarSuperheroeController(req,res){
    
    try {
        const superheroeId = req.params['id'];
        const superheroe = await editarSuperheroeService(superheroeId, req.body);

        if (superheroe) {
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                res.status(200);
                res.redirect(`/api/heroes/${superheroe.id}`);
            } else {
                res.status(200).send(renderizarSuperheroe(superheroe));    
            }       
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

    } catch (error) {
        console.error('Error en el controlador:', error.message);
        res.status(400).send({ mensaje: "Error al editar superhéroe", error: error.message });
    }
}

export async function eliminarSuperheroePorIdController(req,res){

    try {
        const superheroeId = req.params['id'];
        const superheroe = await eliminarSuperheroePorIdService(superheroeId);

        if (superheroe) {
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                res.status(200);
                res.redirect(`/api/heroes`);
            } else {
                res.status(200).send(renderizarSuperheroe(superheroe));    
            }  
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        
    } catch (error) {
        console.error('Error en el controlador:', error.message);
        res.status(400).send({ mensaje: "Error al eliminar por id a un superhéroe", error: error.message });
    }

}

export async function eliminarSuperheroePorNombreController(req,res){

    try {
        const superheroeNombre = req.params['nombre'];
        const superheroe = await eliminarSuperheroePorNombreService(superheroeNombre);
        res.status(200).send(renderizarSuperheroe(superheroe));
    } catch (error) {
        console.error('Error en el controlador:', error.message);
        res.status(400).send({ mensaje: "Error al eliminar por nombre a un superhéroe", error: error.message });
    }
}