const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const { body } = require('express-validator');

router.post(
	'/signup',
	[
		body('name')
			.isLength({ min: 10 })
			.withMessage('Invalid email address')
			.not()
			.isEmpty()
			.withMessage('Name cannot be empty')
			.isString(),
		body('email').isEmail().withMessage('Invalid email address'),
		body('password')
			.not()
			.isEmpty()
			.withMessage('Password cannot be empty')
			.isLength({ min: 8 })
			.withMessage('Password is too short - should be 8 characters minimum')
			.custom((value) => {
				const re = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
				const match = re.test(value);
				if (match === false) {
					throw new Error(
						'Password should contain at least one letter, one big letter, one number and one special character'
					);
				}

				return true;
			}),
	],
	authController.createUser
);

router.post(
	'/login',
	[
		body('email')
			.not()
			.isEmpty()
			.withMessage('Emali field cannot be empty')
			.isEmail()
			.withMessage('Invalid email address'),
		body('password')
			.not()
			.isEmpty()
			.withMessage('Password cannot be empty')
			.isLength({ min: 8 })
			.withMessage('Password is too short - should be 8 characters minimum')
			.custom((value) => {
				const re = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
				const match = re.test(value);
				if (match === false) {
					throw new Error(
						'Password should contain at least one letter, one big letter, one number and one special character'
					);
				}

				return true;
			}),
	],
	authController.logInUser
);

module.exports = router;
