const express = require('express');
const router  = express.Router();
const userController = require('../controller/userController');
const loginMiddleware = require('../middleware/loginMiddleware')

router.post('/',loginMiddleware.validate,userController.create);
router.post('/get',loginMiddleware.validate,userController.get);

module.exports =  router;