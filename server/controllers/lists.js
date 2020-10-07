const List = require('../models/list');
const User = require('../models/user');
exports.getAllLists = async (req, res, next) => {
	const { userId } = req;
	let lists;
	try {
		lists = await List.find({ userId });
	} catch (err) {
		const error = new Error(
			'Internal problem occured, Cannot find any lists for user'
		);
		error.statusCode = 500;
		return next(error);
	}
	if (lists.length === 0) {
		return res.status(404).json({ message: 'User does not have any lists' });
	}

	const userLists = lists
		.filter((list) => list.isDefaultList === false)
		.map((list) => ({
			_id: list._id,
			name: list.name,
			emoji: list.emoji,
			color: list.color,
			todos: list.todos,
			isDefaultList: list.isDefaultList,
		}));
	const defaultLists = lists
		.filter((list) => list.isDefaultList === true)
		.map((list) => ({
			_id: list._id,
			name: list.name,
			emoji: list.emoji,
			color: list.color,
			todos: list.todos,
			isDefaultList: list.isDefaultList,
		}));

	res.status(200).json({
		message: 'Lists fetched',
		defaultLists,
		userLists,
	});
};

exports.createList = async (req, res, next) => {
	const { userId } = req;
	const { listName } = req.body;
	const user = await User.findOne({ _id: userId });
	const list = new List({
		userId: user._id,
		name: listName,
		emoji: '📝',
		color: '',
		todos: [],
		isDefaultList: false,
	});
	const createdList = await list.save();
	res.status(201).json({
		message: 'List created.',
		status: 201,
		list: {
			_id: createdList._id,
			name: createdList.name,
			userId: createdList.userId,
			emoji: createdList.emoji,
			color: createdList.color,
			todos: createdList.todos,
			isDefaultList: createdList.isDefaultList,
		},
	});
};

exports.updateList = async (req, res, next) => {
	const { userId } = req;
	const { listObj } = req.body;
	const list = await List.findOne({ _id: listObj._id });
	if (list.userId.toString() === userId) {
		list.isDefaultList = listObj.isDefaultList;
		list.name = listObj.name;
		list.emoji = listObj.emoji;
		list.color = listObj.color;
		list.todos = listObj.todos;
		const result = await list.save();
		if (result) {
			res.status(200).json({
				message: 'List updated',
				status: 200,
			});
		} else {
			res.status(500).json({ message: 'Internal Error', status: 500 });
		}
	} else {
		res
			.status(401)
			.json({ message: 'You cannot perform this action', status: 401 });
	}
};
