import mongoose from 'mongoose'

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true},
    nombreReal: { type: String, required: true},
    edad: { type: Number, min: 0},
    planetaOrigen: { type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now}
},{
    collection: 'Grupo-17',
    versionKey: false // Desactiva __v
});

export default mongoose.model('Superheroe', superheroSchema);