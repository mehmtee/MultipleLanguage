const express = require('express');
const router  = express.Router();
const tokenController = require('../controller/tokenController')
const isAdmin = require('../middleware/isAdmin');

router.get('/get/:id',isAdmin,tokenController.get);
router.get('/validate',tokenController.validate)

module.exports = router;