const express = require('express');
const router  = express.Router();
const projectController = require('../controller/projectController');
const loginMiddleware = require('../middleware/loginMiddleware');
const isAdmin = require('../middleware/isAdmin');
router.post('/',loginMiddleware.validate,projectController.create);

router.get('/:accountId',loginMiddleware.validate,projectController.getOne);

router.get('/',loginMiddleware.validate,isAdmin, projectController.get);

router.put('/',loginMiddleware.validate,projectController.update);

module.exports =  router;