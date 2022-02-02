const express = require('express');
const router  = express.Router();
const translationController = require('../controller/translationController');
const loginMiddleware = require('../middleware/loginMiddleware');

router.post('/',loginMiddleware.validate,translationController.create);
router.post('/get',loginMiddleware.validate,translationController.get);



module.exports =  router;