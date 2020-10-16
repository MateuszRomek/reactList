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
	const user = await User.findOne({ _id: userId });
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
		currentList: user.currentUserList,
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
exports.deleteList = async (req, res, next) => {
	const { userId } = req;
	const { deleteId } = req.body;
	const user = await User.findOne({ _id: userId });
	let userResult;
	if (user.currentUserList === deleteId) {
		user.currentUserList = '';
		userResult = await user.save();
	}
	if (!userResult) {
		return res.status(500).json({ message: 'Internal Error', status: 500 });
	}
	const list = await List.findOne({ _id: deleteId, userId });
	if (!list) {
		return res
			.status(401)
			.json({ message: 'The user does not have such a list.', status: 401 });
	}
	if (list.isDefaultList) {
		return res
			.status(403)
			.json({ message: 'Cannot delete default list', status: 403 });
	}
	const result = await List.deleteOne({ _id: deleteId });
	if (!result) {
		return res.status(500).json({ message: 'Internal Error', status: 500 });
	}

	res.status(200).json({ message: 'List has been deleter', status: 200 });
};
