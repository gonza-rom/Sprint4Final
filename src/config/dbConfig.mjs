// Importa la biblioteca mongoose para la conexión y manipulación de MongoDB.
import mongoose from 'mongoose';

/**
 * Establece la conexión con la base de datos MongoDB.
 */
export async function connectDB() {
    try {
        // Conecta a la base de datos MongoDB utilizando la URL de conexión.
        await mongoose.connect('mongodb+srv://Grupo-17:grupo17@cursadanodejs.ls9ii.mongodb.net/Node-js', {
            useNewUrlParser: true, // Utiliza el nuevo analizador de URL.
            useUnifiedTopology: true // Usa el nuevo motor de administración de conexiones.
        });

        // Muestra un mensaje de éxito si la conexión es exitosa.
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        // Muestra un mensaje de error en caso de fallar la conexión.
        console.error('Error al conectar a MongoDB:', error);

        // Finaliza el proceso con un código de error.
        process.exit(1);
    }
}
