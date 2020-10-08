const mongoose = require('mongoose');
const { string } = require('yup');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		currentUserList: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
