const Todo = require('../models/todo');

exports.createNewTodo = (req, res, next) => {
	const { userId } = req;
	const { todoTitle, listId } = req.body;
};
