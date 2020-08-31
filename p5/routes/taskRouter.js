'use strict'

const taskController = require("./taskController");
const userSessionRouter = require("./userSessionRouter");

/** setup Router */
const express = require('express');
var router = express.Router();

/** GET */
router.get("/", userSessionRouter.currentUser, taskController.tasks);

module.exports = router;