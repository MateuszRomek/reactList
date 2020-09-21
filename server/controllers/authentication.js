const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const SALTROUNDS = 12;
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
	//TODO connect mongodb to this and create user. Then res 200 status
	const { name, email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed');
		error.statusCode = 422;
		error.errorData = errors.array({ onlyFirstError: true });

		throw error;
	}

	bcrypt
		.genSalt(SALTROUNDS)
		.then((salt) => {
			return bcrypt.hash(password, salt);
		})
		.then((hashPass) => {
			const user = new User({ name, email, password: hashPass });
			return user.save();
		})
		.then((result) => {
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

exports.logInUser = async (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed');
		error.statusCode = 422;
		error.errorData = errors.array({ onlyFirstError: true });

		return next(error);
	}
	const user = await User.findOne({ email });
	if (!user) {
		const error = new Error('There is no account with this e-mail');
		error.statusCode = 404;
		return next(error);
	}
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		const error = new Error('Incorrect password');
		error.statusCode = 401;
		return next(error);
	}
	jwt.sign(
		{
			uId: user._id.toString(),
		},
		process.env.SECRET,
		{ expiresIn: 1800 },
		function (err, token) {
			if (err) {
				console.log(err);
				const error = new Error('Internal error has occured');
				return next(error);
			} else {
				res.status(200).json({
					token,
					name: user.name,
					uid: user._id,
				});
			}
		}
	);
};
