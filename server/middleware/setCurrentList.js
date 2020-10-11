const User = require('../models/user');
const setCurrentList = async (req, res, next) => {
	const listId = req.body.listId;
	if (!listId) {
		next();
	} else {
		const { userId } = req;
		const user = await User.findOne({ _id: userId });
		user.currentUserList = listId;
		const result = await user.save();
		next();
	}
};

module.exports = setCurrentList;
