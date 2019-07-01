var express = require('express');
var todoController = require('../controllers/todoController');
var router = express.Router();

router.get('/', todoController.findAll);

router.get('/:id', todoController.findOne);

router.delete('/:id', todoController.delete);

router.put('/:id', todoController.update);

router.post('/', todoController.create);

module.exports = router;
