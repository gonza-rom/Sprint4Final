/**
 * Interfaz base para repositorios.
 * Define los métodos que deben ser implementados por cualquier clase que extienda esta interfaz.
 * Si un método no se implementa en la clase hija, se lanzará un error.
 */
class IRepository {
    /**
     * Método para obtener un registro por su ID.
     * Debe ser implementado por las clases que extiendan esta interfaz.
     * @param {string} id - ID del registro a buscar.
     * @throws {Error} - Si el método no está implementado.
     */
    obtenerPorId(id) {
        throw new Error("Metodo 'obtenerPorId' no implementado");
    }

    /**
     * Método para obtener todos los registros.
     * Debe ser implementado por las clases que extiendan esta interfaz.
     * @throws {Error} - Si el método no está implementado.
     */
    obtenerTodos() {
        throw new Error("Metodo 'obtenerTodos' no implementado");
    }

    /**
     * Método para buscar registros por un atributo y su valor.
     * Debe ser implementado por las clases que extiendan esta interfaz.
     * @param {string} atributo - Nombre del atributo por el cual buscar.
     * @param {string|number} valor - Valor del atributo buscado.
     * @throws {Error} - Si el método no está implementado.
     */
    buscarPorAtributo(atributo, valor) {
        throw new Error("Metodo 'buscarPorAtributo' no implementado");
    }

    /**
     * Método para obtener registros que cumplan con la condición de ser mayores de 30.
     * Debe ser implementado por las clases que extiendan esta interfaz.
     * @throws {Error} - Si el método no está implementado.
     */
    obtenerMayoresDe30() {
        throw new Error("Metodo 'obtenerMayoresDe30' no implementado");
    }
}

// Exporta la clase para que pueda ser extendida por otros módulos.
export default IRepository;
