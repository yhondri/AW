//app.js

'use strict'

const config = require("./config");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
// La variable ficherosEstaticos guarda el // nombre del directorio donde se encuentran // los ficheros estáticos:
// <directorioProyecto>/public
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));
app.set("view engine", "ejs"); //configurar ejs como motor de plantillas
app.set("views", path.join(__dirname, "views")); //directorio donde van a estas las vistas plantillas
app.use(bodyParser.urlencoded({
    extended: false
}));

//Routers
var router = express.Router();
const taskRouter = require('./routes/taskRouter');
app.use("/", taskRouter);


// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});