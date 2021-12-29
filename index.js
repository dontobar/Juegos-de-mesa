const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');
require('dotenv').config();

//crear el servidor/aplicacion de express
const app =  express();

//Base de Datos
dbConnection();

//Directorio Publico
app.use(express.static('public'));

//CORS
app.use(cors());


//lectura y parseo del body
app.use(express.json());


//Rutas
app.use( '/api/auth', require('./routes/auth'));

//Manejar demas rutas
app.get('*',(req,res)=>{
    res.sendFile( path.resolve(__dirname,'public/index.html'));
});


app.listen( process.env.PORT, () => {
    console.log(`Servidor Corriendo puerto ${process.env.PORT}`);
});