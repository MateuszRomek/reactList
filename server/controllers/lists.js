const List = require('../models/list');
exports.getAllLists = async (req, res, next) => {
	const { userId } = req;
	let lists;
	try {
		lists = await List.find({ userId });
	} catch (err) {
		const error = new Error('Internal problem occured');
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
