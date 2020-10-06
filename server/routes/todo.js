const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const isAuth = require('../middleware/isAuth');

router.post('/todo/create', isAuth, todoController.createNewTodo);
