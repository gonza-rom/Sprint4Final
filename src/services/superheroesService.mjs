// Importa el repositorio de superhéroes, el modelo Superheroe y la biblioteca mongoose para la manipulación de datos.
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import Superheroe from '../models/SuperHero.mjs';
import mongoose from 'mongoose';

/**
 * Obtiene un superhéroe por su ID.
 * @param {string} id - El ID del superhéroe.
 * @returns {Object} - El superhéroe encontrado.
 */
export async function obtenerSuperheroePorId(id) {
    console.log(id); // Muestra el ID en la consola para depuración.
    return await superHeroRepository.obtenerPorId(id);
}

/**
 * Obtiene todos los superhéroes registrados.
 * @returns {Array} - Lista de todos los superhéroes.
 */
export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

/**
 * Busca superhéroes por un atributo específico y su valor.
 * @param {string} atributo - El atributo a buscar (por ejemplo, "nombreSuperHeroe").
 * @param {string|number} valor - El valor del atributo.
 * @returns {Array} - Lista de superhéroes que coinciden con el criterio.
 */
export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

/**
 * Obtiene superhéroes mayores de 30 años, con al menos dos poderes, y cuyo planeta de origen sea la Tierra.
 * @returns {Array} - Lista de superhéroes que cumplen los criterios.
 */
export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

/**
 * Crea un nuevo superhéroe y lo guarda en la base de datos.
 * @param {Object} heroe - Objeto con los datos del superhéroe.
 * @returns {Object} - El superhéroe creado.
 */
export async function crearSuperheroeService(heroe) {
    try {
        // Crea una nueva instancia del modelo Superheroe.
        const hero = new Superheroe({
            nombreSuperHeroe: heroe.nombreSuperHeroe,
            nombreReal: heroe.nombreReal,
            edad: heroe.edad,
            planetaOrigen: heroe.planetaOrigen || 'Desconocido', // Valor predeterminado.
            debilidad: heroe.debilidad,
            poderes: heroe.poderes || [], // Inicializa como arreglo vacío si no se proporciona.
            aliados: heroe.aliados || [],
            enemigos: heroe.enemigos || []
        });

        // Guarda el superhéroe en la base de datos.
        const savedHero = await hero.save();
        return savedHero;
    } catch (error) {
        console.error('Error al crear el superhéroe:', error.message);
        throw new Error('No se pudo crear el superhéroe.');
    }
}

/**
 * Edita un superhéroe existente.
 * @param {string} id - El ID del superhéroe.
 * @param {Object} heroe - Objeto con los nuevos datos del superhéroe.
 * @returns {Object} - El superhéroe actualizado.
 */
export async function editarSuperheroeService(id, heroe) {
    console.log(id); // Muestra el ID en la consola para depuración.

    try {
        // Actualiza el superhéroe en la base de datos.
        await Superheroe.updateOne(
            { _id: id },
            {
                $set: {
                    nombreSuperHeroe: heroe.nombreSuperHeroe,
                    nombreReal: heroe.nombreReal,
                    edad: heroe.edad,
                    planetaOrigen: heroe.planetaOrigen || 'Desconocido',
                    debilidad: heroe.debilidad,
                    poderes: heroe.poderes || [],
                    aliados: heroe.aliados || [],
                    enemigos: heroe.enemigos || []
                }
            }
        );

        // Retorna el superhéroe actualizado.
        return superHeroRepository.obtenerPorId(id);
    } catch (error) {
        console.error('Error al editar el superhéroe:', error.message);
        throw new Error('No se pudo editar el superhéroe.');
    }
}

/**
 * Elimina un superhéroe por su ID.
 * @param {string} id - El ID del superhéroe.
 * @returns {Object} - El superhéroe eliminado.
 */
export async function eliminarSuperheroePorIdService(id) {
    console.log(id); // Muestra el ID en la consola para depuración.

    // Valida que el ID sea un ObjectId válido.
    if (!mongoose.isValidObjectId(id)) {
        throw new Error("El ID proporcionado no es válido.");
    }

    // Obtiene el superhéroe antes de eliminarlo.
    const heroeEliminado = await superHeroRepository.obtenerPorId(id);

    if (!heroeEliminado) {
        throw new Error("No se encontró un superhéroe con el ID proporcionado.");
    }

    // Elimina el superhéroe de la base de datos.
    await Superheroe.deleteOne({ _id: id });

    return heroeEliminado;
}

/**
 * Elimina un superhéroe por su nombre.
 * @param {string} nombre - El nombre del superhéroe.
 * @returns {Object} - El superhéroe eliminado.
 */
export async function eliminarSuperheroePorNombreService(nombre) {
    console.log(nombre); // Muestra el nombre en la consola para depuración.

    // Busca el superhéroe por su nombre.
    const heroeEliminado = await superHeroRepository.buscarPorAtributo("nombreSuperHeroe", nombre);

    // Verifica si se encontró algún superhéroe con el nombre proporcionado.
    if (!heroeEliminado || heroeEliminado.length === 0) {
        throw new Error(`No se encontró ningún superhéroe con el nombre: ${nombre}`);
    }

    // Elimina el superhéroe de la base de datos.
    await Superheroe.deleteOne({ nombreSuperHeroe: nombre });

    return heroeEliminado[0]; // Retorna el primer superhéroe encontrado.
}
