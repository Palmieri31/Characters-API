const express = require('express');
const charactersController = require('../controllers/characters');
const charactersRouter = express.Router();

charactersRouter.post('/', charactersController.create);
charactersRouter.get('/:characterId', charactersController.getById);
charactersRouter.patch('/:characterId', charactersController.update);
charactersRouter.delete('/:characterId', charactersController.remove);

module.exports = charactersRouter;