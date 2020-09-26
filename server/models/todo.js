const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		listId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'list',
		},

		title: {
			type: String,
			required: true,
		},
		isChecked: {
			type: Boolean,
			required: true,
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('todo', todoSchema);
