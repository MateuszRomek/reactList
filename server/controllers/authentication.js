const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.createUser = (req, res, next) => {
	//TODO connect mongodb to this and create user. Then res 200 status
	console.log('Request incoming');
	const { name, email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed');
		error.statusCode = 422;
		error.errors = errors.array().map((error) => {
			const { param, msg } = error;
			return {
				[param]: {
					errorText: msg,
				},
			};
		});
		throw error;
	}

	bcrypt
		.genSalt(saltRounds)
		.then((salt) => {
			return bcrypt.hash(password, salt);
		})
		.then((hashPass) => {
			const user = new User({ name, email, password: hashPass });
			return user.save();
		})
		.then((result) => {
			console.log(result);
			//TODO Create JWT and send this to client
			res.status(200).json({
				message: 'User created',
				user: {
					_id: result._id,
				},
			});
		})
		.catch((err) => {
			if (err.code === 11000) {
				const error = new Error('Email Already Exits');
				error.statusCode = 409;
				error.errors = {
					email: {
						message: `${err.keyValue.email} is already in use`,
					},
				};
				next(error);
			}
		});
};
