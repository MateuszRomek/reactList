const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'user',
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
