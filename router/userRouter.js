const express = require('express');
const router  = express.Router();
const userController = require('../controller/userController');
const loginMiddleware = require('../middleware/loginMiddleware');
const isAdmin = require('../middleware/isAdmin');

router.post('/',loginMiddleware.validate,userController.create);

router.get('/',loginMiddleware.validate,isAdmin,userController.getAll);
router.get('/:id',loginMiddleware.validate,userController.get);
router.put('/:id',loginMiddleware.validate,isAdmin,userController.deleteUser);
module.exports =  router;