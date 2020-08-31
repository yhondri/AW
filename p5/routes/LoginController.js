"use strict"

/* Ficheros del proyecto (creados por nosotros)*/
const config = require("../config");
const utils = require("../utils");

const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig); // Crear un pool de conexiones a la base de datos de MySQL

/* DAOs */
const DAOUser = require("../DAOUser");
const UserDAO = new DAOUser(pool);

/** setup Router */
const express = require('express');

/** GET */
function root(request, response) {
    response.status(200);
    response.redirect("/login");
}

function getLogin(request, response) {
    response.status(200);
    if (request.session.currentUser != null) {
        response.redirect("/tasks");
    } else {
        response.render("login", {
            errorMsg: null
        });
    }
}

/** POST */
function onLogin(request, response) {
    if (request.session.currentUser != null) {
        response.status(200);
        response.redirect("tasks");
    } else {
        UserDAO.checkUser(request.body.email, request.body.password, function(err, result) {
            if (err) {
                response.status(404);
                response.render("login", {
                    errorMsg: "User not found"
                });
            } else {
                request.session.currentUser = request.body.email;
                response.status(200);
                response.redirect("tasks");
            }
        });
    }
}

module.exports = {
    root,
    getLogin,
    onLogin
}