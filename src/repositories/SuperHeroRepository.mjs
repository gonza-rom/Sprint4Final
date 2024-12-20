import SuperHero from "../models/SuperHero.mjs"; // Importa el modelo de superhéroes
import IRepository from "./IRepository.mjs"; // Importa la interfaz base para repositorios
import mongoose from 'mongoose'; // Importa mongoose para validar y trabajar con IDs

/**
 * Repositorio para manejar operaciones relacionadas con la colección de superhéroes.
 * Extiende una interfaz genérica de repositorios (IRepository).
 */
class SuperHeroRepository extends IRepository {
    /**
     * Obtiene un superhéroe por su ID.
     * @param {string} id - ID del superhéroe.
     * @returns {Promise<Object>} - Superhéroe encontrado o null si no existe.
     * @throws {Error} - Si el ID proporcionado no es válido.
     */
    async obtenerPorId(id) {
        // Verifica si el ID proporcionado es válido en formato ObjectId de MongoDB
        if (!mongoose.isValidObjectId(id)) {
            throw new Error("El ID proporcionado no es válido.");
        }
        // Busca el superhéroe por su ID
        return await SuperHero.findById(id);
    }

    /**
     * Obtiene todos los superhéroes de la base de datos.
     * @returns {Promise<Array>} - Lista de todos los superhéroes.
     */
    async obtenerTodos() {
        // Realiza una consulta para obtener todos los documentos en la colección
        const heroes = await SuperHero.find();
        return heroes;
    }

    /**
     * Busca superhéroes por un atributo específico y su valor.
     * @param {string} atributo - Atributo por el cual buscar (ejemplo: 'nombre', 'edad').
     * @param {string|number} valor - Valor del atributo buscado.
     * @returns {Promise<Array>} - Lista de superhéroes que coincidan con la búsqueda.
     */
    async buscarPorAtributo(atributo, valor) {
        const query = {}; // Objeto para construir la consulta dinámica

        // Lista de atributos que deben tratarse como números
        const camposNumericos = ['edad', 'codigo'];

        if (camposNumericos.includes(atributo) && !isNaN(valor)) {
            // Si el atributo es numérico, convierte el valor a número
            query[atributo] = Number(valor);
        } else if (['poderes', 'aliados', 'enemigos'].includes(atributo)) {
            // Si el atributo es un array (poderes, aliados, enemigos), busca coincidencias parciales
            query[atributo] = { $elemMatch: { $regex: valor, $options: 'i' } };
        } else {
            // Para otros atributos, realiza una búsqueda insensible a mayúsculas/minúsculas
            query[atributo] = new RegExp(valor, 'i');
        }

        // Realiza la consulta con el objeto query construido
        return await SuperHero.find(query);
    }

    /**
     * Obtiene superhéroes mayores de 30 años, que sean del planeta Tierra,
     * con al menos 2 poderes y cuyo código sea numérico.
     * @returns {Promise<Array>} - Lista de superhéroes que cumplen las condiciones.
     */
    async obtenerMayoresDe30() {
        return await SuperHero.find({
            codigo: { $type: "number" }, // Asegura que el campo 'codigo' sea numérico
            edad: { $gt: 30 }, // Filtra superhéroes con edad mayor a 30
            planetaOrigen: 'Tierra', // Filtra superhéroes cuyo planeta de origen sea 'Tierra'
            $expr: { $gte: [{ $size: "$poderes" }, 2] } // Asegura que el array de poderes tenga al menos 2 elementos
        });
    }
}

// Exporta una instancia del repositorio para su uso en otros módulos
export default new SuperHeroRepository();
