"use strict"

/* Ficheros del proyecto (creados por nosotros)*/
const config = require("../config");
const utils = require("../utils");

const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig); // Crear un pool de conexiones a la base de datos de MySQL

/* DAOs */
const DAOTasks = require("../DAOTasks");
const taskDAO = new DAOTasks(pool); // Crear una instancia de PreguntaDao

function tasks(request, response) {
    taskDAO.getAllTasks(response.locals.email, function(err, tasks) {
        if (err) {
            response.status(404);
        } else {
            response.status(200);
            response.render("tasks", {
                tasks: tasks
            });
        }
    });
}

module.exports = {
    tasks
}