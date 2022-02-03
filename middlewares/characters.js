const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const validateCharacter = [
  check('name')
    .notEmpty()
    .withMessage('You need to enter a name')
    .bail(),

  check('creator')
    .notEmpty()
    .withMessage('You need to enter a creator')
    .bail(),

  check('firstApparition')
    .notEmpty()
    .withMessage('You need to enter a date!')
    .isDate()
    .withMessage('first apparition is not a date'),

  check('imgUrl')
    .notEmpty()
    .withMessage('You need to enter a imgUrl'),

  errorHandler,
];

module.exports = {
  validateCharacter,
};
