'use strict'

const config = require("./config");

const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig);

/* DAOs */
const DAOUsers = require("./DAOUsers");
const daoUsers = new DAOUsers(pool);
const DAOTasks = require("./DAOTasks");
const daoTasks = new DAOTasks(pool);

function checkUser(userName, userPassword) {
    daoUsers.isUserCorrect(userName, userPassword, cb_isUserCorrect);
}

function cb_isUserCorrect(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Usuario y contraseña correctos");
    } else {
        console.log("Usuario y/o contraseña incorrectos");
    }
}

// checkUser("joselito", "1234");
// checkUser("pedrito@gmail.com", "pedrito123");

function getUserImageName(userName) {
    daoUsers.getUserImageName(userName, function(err, result) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(result);
        }
    });
}

// getUserImageName("joselito");
// getUserImageName("pedrito@gmail.com");

// function createUser(userName, userPassword) {
//     let user = {
//         email: userName,
//         password: userPassword
//     };

//     daoUsers.insertUser(user, createUserErrorHandler);
// }

// createUser("pedrito@gmail.com", "pedrito123");
// createUser("marianita@gmail.com", "marianita123");
// createUser("pruebita@gmail.com", "pruebita123");

function getAllTasks(email) {
    daoTasks.getAllTasks(email, errorHandler);
}

getAllTasks("pedrito@gmail.com");

// function createTask(id, user, text, done) {
//     let task = {
//         id: id,
//         user: user,
//         text: text,
//         done: done,
//     };

//     daoTasks.insertTask(task, errorHandler);
// }

// function createTag(taskId, tag) {
//     daoTasks.insertTag(taskId, tag, errorHandler);
// }

// createTask(1, "pedrito@gmail.com", "Task 1", false);
// createTask(2, "pedrito@gmail.com", "Task 2", false);
// createTask(3, "pedrito@gmail.com", "Task 2", true);
// createTask(4, "marianita@gmail.com", "Task 1", false);

// createTag(1, "AW");
// createTag(1, "ABD");
// createTag(2, "EDA");
// createTag(4, "EDA");

function errorHandler(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Success! ", result);
    } else {
        console.log("Unknown error");
    }
}