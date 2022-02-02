const express = require('express');
const router  = express.Router();
const projectController = require('../controller/projectController');
const loginMiddleware = require('../middleware/loginMiddleware');
router.post('/',loginMiddleware.validate,projectController.create);

router.get('/',loginMiddleware.validate,projectController.get);
router.put('/',loginMiddleware.validate,projectController.update);

module.exports =  router;