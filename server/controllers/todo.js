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
		deadline: '',
	});

	const createdTodo = await todo.save();
	if (createdTodo) {
		const list = await List.findOne({ _id: listId });
		const todosCopy = [...list.todos];
		todosCopy.push(createdTodo._id.toString());

		list.todos = todosCopy;
		const updatedListTodos = await list.save();
		if (updatedListTodos) {
			res.status(201).json({
				message: 'Todo created.',
				status: 201,
				todo: {
					_id: createdTodo._id,
					title: createdTodo.title,
				},
			});
		}
	} else {
		const error = new Error('Internal error occured');
		error.statusCode = 500;
	}
};

exports.getTodos = async (req, res, next) => {
	const { userId } = req;
	const findTodos = await Todo.find({ userId });
	const todos = findTodos.map((todo) => ({
		title: todo.title,
		isChecked: todo.isChecked,
		description: todo.description,
		_id: todo._id,
		deadline: todo.deadline,
	}));
	res.status(200).json({
		status: 200,
		message: 'Fetched user todos',
		todos,
	});
};

exports.updateTodo = async (req, res, next) => {
	const { todoId, value, modelField } = req.body;
	const todo = await Todo.findOne({ _id: todoId });
	if (modelField === 'isChecked') {
		todo.isChecked = !todo.isChecked;
		const result = await todo.save();
		if (result) {
			return res.status(200);
		} else {
			throw new Error('Internal error occured');
		}
	}
	todo[modelField] = value;
	const result = await todo.save();
	if (result) {
		res.status(200).json({
			status: 200,
			message: 'OK',
		});
	} else {
		throw new Error('Internal error occured');
	}
};

exports.deleteTodo = async (req, res, next) => {
	const { todoId } = req.body;
	const { userId } = req;

	const todo = await Todo.findOne({ _id: todoId, userId });
	if (!todo) {
		return res
			.status(401)
			.json({ message: 'The user does not have such a todo.', status: 401 });
	}
	console.log(todo);
	const result = await Todo.deleteOne({ _id: todoId });
	if (!result) {
		return res.status(500).json({ message: 'Internal Error', status: 500 });
	}

	res.status(200).json({ message: 'Todo has been deleted', status: 200 });
};
