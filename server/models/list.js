const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'user',
		},

		name: {
			type: String,
			required: true,
		},
		emoji: {
			type: String,
		},
		color: {
			type: String,
		},
		todos: [
			{
				type: Schema.Types.ObjectId,
				ref: 'todo',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('list', listSchema);
