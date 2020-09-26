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

	res.status(200).json({
		message: 'Lists fetched',
		lists,
	});
};

exports.createList = async (req, res, next) => {
	const { userId } = req;
	const { listName } = req.body;
	const user = await User.findOne({ _id: userId });
	const list = new List({
		userId: user._id,
		name: listName,
		emoji: '',
		color: '',
		todos: [],
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
