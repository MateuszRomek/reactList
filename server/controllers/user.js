const user = require('../models/user');
exports.getUserinfo = async (req, res, next) => {
	const { userId } = req;
	const userData = await user.findOne({ _id: userId });
	if (!userData) {
		return res
			.status(404)
			.json({ message: 'Incorrect id. There is no such a user.', status: 404 });
	}
	const { name, email } = userData;

	res
		.status(200)
		.json({ userId, name, email, status: 200, message: 'User found' });
};
