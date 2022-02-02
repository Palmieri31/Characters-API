const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
  }
	next();
};

const validateVideogame = [
	check('title')
		.notEmpty()
		.withMessage('You need to enter a title')
		.bail(),

	check('releaseDate')
		.notEmpty()
		.withMessage('You need to enter a date!')
        .isDate()
        .withMessage('releaseDate is not a date'),
		
    check('description')
		.notEmpty()
		.withMessage('You need to enter a description')
		.bail(),

    check('imgUrl')
		.notEmpty()
		.withMessage('You need to enter a imgUrl'),

	errorHandler
];

module.exports = {
	validateVideogame,
};