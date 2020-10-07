const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const isAuth = require('../middleware/isAuth');

router.post('/todo', isAuth, todoController.createNewTodo);
router.get('/todo', isAuth, todoController.getTodos);

module.exports = router;
