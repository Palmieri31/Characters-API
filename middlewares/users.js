const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
  }
	next();
};

const validateUser = [
	check('email')
		.notEmpty()
		.withMessage('You need to enter an email')
		.bail()
		.normalizeEmail()
		.isEmail()
		.withMessage('Invalid email. Ej:name@mail.com')
		.bail(),

	check('username')
		.notEmpty()
		.withMessage('You need to enter a username')
		.bail(),

		check('password')
		.notEmpty()
		.withMessage('You need to enter a password')
		.bail()
		.isLength({ min: 6 })
		.withMessage('The password must be at least 6 characters long')
		.bail(),
	errorHandler
];

const validateLogin = [
	check('email')
		.notEmpty()
		.withMessage('You need to enter an email')
		.bail()
		.normalizeEmail()
		.isEmail()
		.withMessage('Invalid email. Ej:name@mail.com')
		.bail(),

	check('password')
		.notEmpty()
		.withMessage('You need to enter a password')
		.bail()
		.isLength({ min: 6 })
		.withMessage('The password must be at least 6 characters long')
		.bail(),
	errorHandler
]

module.exports = {
	validateUser,
	validateLogin
};