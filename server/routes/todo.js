const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const isAuth = require('../middleware/isAuth');
const setCurrentList = require('../middleware/setCurrentList');
router.post('/todo', isAuth, setCurrentList, todoController.createNewTodo);
router.get('/todo', isAuth, todoController.getTodos);
router.put('/todo', isAuth, setCurrentList, todoController.updateTodo);
module.exports = router;
