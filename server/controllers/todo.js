const Todo = require('../models/todo');
const List = require('../models/list');
exports.createNewTodo = async (req, res, next) => {
	const { userId } = req;
	const { title, listId } = req.body;
	const todo = new Todo({
		userId,
		title,
		isChecked: false,
		description: '',
	});

	const createdTodo = await todo.save();
	if (createdTodo) {
		res.status(201).json({
			message: 'Todo created.',
			status: 201,
			todo: {
				_id: createdTodo._id,
				title: createdTodo.title,
			},
		});
	} else {
		const error = new Error('Internal error occured');
		error.statusCode = 500;
	}

	const list = await List.findOne({ _id: listId });
	const todosCopy = [...list.todos];
	todosCopy.push(createdTodo._id.toString());

	list.todos = todosCopy;
	list.save();
};

exports.getTodos = async (req, res, next) => {
	const { userId } = req;
	const findTodos = await Todo.find({ userId });
	const todos = findTodos.map((todo) => ({
		title: todo.title,
		isChecked: todo.isChecked,
		description: todo.description,
		_id: todo._id,
	}));
	res.status(200).json({
		status: 200,
		message: 'Fetched user todos',
		todos,
	});
};
