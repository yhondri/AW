//app.js

'use strict'

const config = require("./config");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

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
const loginRouter = require('./routes/LoginRouter');

app.use(middlewareSession);
app.use("/", loginRouter);
app.use("/login", loginRouter);
app.use("/tasks", taskRouter);

// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});