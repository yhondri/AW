'use strict'

const loginController = require("./LoginController");
// const userSessionRouter = require("./userSessionRouter");

/** setup Router */
const express = require('express');
var router = express.Router();


/** GET */
router.get("/", loginController.root);
router.get("/login", loginController.getLogin);

/** POST */
router.post("/on_login", loginController.onLogin);


module.exports = router;