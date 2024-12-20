// Importa el módulo mongoose para manejar la conexión y definición de esquemas en MongoDB.
import mongoose from 'mongoose';

/**
 * Definición del esquema para los documentos de superhéroes en MongoDB.
 * Un esquema define la estructura y restricciones de los datos que se almacenarán en la base de datos.
 */
const superheroSchema = new mongoose.Schema(
    {
        // Nombre del superhéroe (obligatorio).
        nombreSuperHeroe: { 
            type: String,       // Tipo de dato: cadena de texto.
            required: true      // Campo obligatorio.
        },

        // Nombre real del superhéroe (obligatorio).
        nombreReal: { 
            type: String,       // Tipo de dato: cadena de texto.
            required: true      // Campo obligatorio.
        },

        // Edad del superhéroe (opcional, con un mínimo de 0).
        edad: { 
            type: Number,       // Tipo de dato: número.
            min: 0              // Valor mínimo permitido.
        },

        // Planeta de origen del superhéroe (valor predeterminado: "Desconocido").
        planetaOrigen: { 
            type: String,       // Tipo de dato: cadena de texto.
            default: 'Desconocido' // Valor predeterminado si no se especifica.
        },

        // Debilidad del superhéroe (opcional).
        debilidad: { 
            type: String        // Tipo de dato: cadena de texto.
        },

        // Lista de poderes del superhéroe (opcional).
        poderes: [String],       // Arreglo de cadenas de texto.

        // Lista de aliados del superhéroe (opcional).
        aliados: [String],       // Arreglo de cadenas de texto.

        // Lista de enemigos del superhéroe (opcional).
        enemigos: [String],      // Arreglo de cadenas de texto.

        // Fecha de creación del registro (valor predeterminado: fecha actual).
        createdAt: { 
            type: Date,          // Tipo de dato: fecha.
            default: Date.now    // Valor predeterminado: fecha y hora actual.
        }
    },
    {
        // Opciones adicionales para el esquema.
        collection: 'Grupo-17',  // Nombre de la colección en la base de datos.
        versionKey: false        // Desactiva la clave `__v` que mongoose agrega por defecto.
    }
);

/**
 * Exporta el modelo de superhéroe basado en el esquema definido.
 * Este modelo se usará para interactuar con la colección "Grupo-17" en MongoDB.
 */
export default mongoose.model('Superheroe', superheroSchema);
