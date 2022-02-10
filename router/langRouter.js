const express = require('express');
const router  = express.Router();
const langController = require('../controller/langController');
const loginMiddleware = require('../middleware/loginMiddleware');
router.post('/',loginMiddleware.validate,langController.create);
router.get('/:projectId',loginMiddleware.validate,langController.get);
module.exports =  router;