//dependencia de node para:
//express=servidor
const express = require('express');
const app = express();
//mysqls=db
const mysql = require('mysql2');
//frond=hbs motor de plantilla
const hbs = require('hbs');
//email=nodemailer es para enviar correos
const nodemailer = require('nodemailer');
//rutas=path. Encuntra archivos
const path = require('path');
const exp = require('constants');
//configuracion de dotenv para variables de entorno
require('dotenv').config();

//configuramos el puerto
const PORT = process.env.PORT || 9000;


//console.log();

//Midelware. esto hace que la aplicacion entienda y se comunique con los comandos
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//configuramos motor de plantillas para el frond con HBS
app.set('view engine', 'hbs');
//configuracion la ubicaion de las plantillas
app.set('views', path.join(__dirname, 'views'));
//configuracion los partial de los motores de las plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//conexion de la base de datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

conexion.connect((err) =>{
    if(err) throw err;
    console.log(`conectado a la base de datos: ${process.env.DATABASE}`);
})

//rutas de la app
app.get('/', (req, res)=>{
    res.send('HOLA')
})


//servidor a la escucha de las peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el puerto: ${PORT}`);
})


