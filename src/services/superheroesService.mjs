import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import Superheroe from '../models/SuperHero.mjs';
import mongoose from 'mongoose';


export async function obtenerSuperheroePorId(id) {
    console.log(id);
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

export async function crearSuperheroeService(heroe){
    try {
        const hero = new Superheroe ({
            nombreSuperHeroe: heroe.nombreSuperHeroe,
            nombreReal: heroe.nombreReal,
            edad: heroe.edad,
            planetaOrigen: heroe.planetaOrigen || 'Desconocido',
            debilidad: heroe.debilidad,
            poderes: heroe.poderes || [],
            aliados: heroe.aliados || [],
            enemigos: heroe.enemigos || []
        });

        const savedHero = await hero.save();
        return savedHero;

    } catch (error) {

        console.error('Error al crear el superhéroe:', error.message);
        throw new Error('No se pudo crear el superhéroe.');
    }

}


export async function editarSuperheroeService(id, heroe){   
    console.log(id);
    //console.log(heroe);

    try { 
        await Superheroe.updateOne(
            { _id: id},
            { $set: {nombreSuperHeroe: heroe.nombreSuperHeroe,
                    nombreReal: heroe.nombreReal,
                    edad: heroe.edad,
                    planetaOrigen: heroe.planetaOrigen || 'Desconocido',
                    debilidad: heroe.debilidad,
                    poderes: heroe.poderes || [],
                    aliados: heroe.aliados || [],
                    enemigos: heroe.enemigos || []
            }}
        );
    
        return superHeroRepository.obtenerPorId(id);
        
    } catch (error) {

        console.error('Error al crear el superhéroe:', error.message);
        throw new Error('No se pudo crear el superhéroe.');
    }

}


export async function eliminarSuperheroePorIdService(id){
    console.log(id);

    // Validar si el ID es un ObjectId válido
    if (!mongoose.isValidObjectId(id)) {
        throw new Error("El ID proporcionado no es válido.");
    }

    const heroeEliminado = superHeroRepository.obtenerPorId(id);

    if (!heroeEliminado) {
        throw new Error("No se encontró un superhéroe con el ID proporcionado.");
    }

    await Superheroe.deleteOne({ _id: id });

    return heroeEliminado;
}

export async function eliminarSuperheroePorNombreService(nombre){
    console.log(nombre);

    const heroeEliminado = await superHeroRepository.buscarPorAtributo("nombreSuperHeroe",nombre);

    // Verificar si hay resultados
    if (!heroeEliminado || heroeEliminado.length === 0) {
        throw new Error(`No se encontró ningún superhéroe con el nombre: ${nombre}`);
    }

    await Superheroe.deleteOne({ nombreSuperHeroe: nombre });

    return heroeEliminado[0];
}