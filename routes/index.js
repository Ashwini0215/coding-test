const express = require('express');
const payloadController   = require('../controllers/transformController.js');
const routes = express.Router();


//Call controller method
routes.post('/transformation', payloadController.transformed);

module.exports = routes;