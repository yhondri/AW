"use strict"

/* Ficheros del proyecto (creados por nosotros)*/
const config = require("../config");
const utils = require("../utils");

const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig); // Crear un pool de conexiones a la base de datos de MySQL

/* DAOs */
// const taskDao = require("../DAOTasks");
// const userD = new UserDAO(pool); // Crear una instancia de UserDAO
const DAOTasks = require("../DAOTasks");
const taskDAO = new DAOTasks(pool); // Crear una instancia de PreguntaDao

/** setup Router */
const express = require('express');

function tasks(request, response) {
    let email = "pedrito@gmail.com";
    taskDAO.getAllTasks(email, function(err, tasks) {
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