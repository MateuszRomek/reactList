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
		}));
	const defaultLists = lists
		.filter((list) => list.isDefaultList === true)
		.map((list) => ({
			_id: list._id,
			name: list.name,
			emoji: list.emoji,
			color: list.color,
			todos: list.todos,
		}));

	console.log('user', userLists);
	console.log('def', defaultLists);
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
		},
	});
};
