import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';


const app = express();
const PORT = process.env.PORT || 3000;

//Configurar EJS como motor de plantillas
app.set('view engine','ejs');
app.set('views', path.resolve('./ejs-layout-example/views'));

//Configurar express-ejs-layout
app.use(expressEjsLayouts);
app.set('layout','layout'); //Archivo base de layout

//Servir archivos estaticos
app.use(express.static(path.resolve('./ejs-layout-example/public')));

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
};

//app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Esto permite procesar datos enviados en el cuerpo de formularios

// Middleware para soportar métodos como DELETE y PUT
app.use(methodOverride('_method'));

// EJS
app.set('view engine', 'ejs');

// Configuración de rutas
app.use('/api', superHeroRoutes);


app.get('/',(req,res) => {
    res.render('index',{title:'Pagina Principal'});
});

app.get('/about', (req,res) => {
    res.render('about',{title:'acerca de nosotros'});
});

app.get('/contact', (req,res) => {
    res.render('contact',{title:'contactanos'});
});


// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor  
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
