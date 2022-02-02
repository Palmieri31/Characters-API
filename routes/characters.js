const express = require('express');
const charactersController = require('../controllers/characters');
const authsMiddleware = require('../middlewares/auths');
const charactersMiddleware= require('../middlewares/characters');
const charactersRouter = express.Router();

charactersRouter.post('/', charactersMiddleware.validateCharacter, authsMiddleware.isAdmin, charactersController.create);
charactersRouter.get('/:characterId', authsMiddleware.isLoggedUser, charactersController.getById);
charactersRouter.patch('/:characterId', authsMiddleware.isAdmin, charactersController.update);
charactersRouter.delete('/:characterId', authsMiddleware.isAdmin, charactersController.remove);

module.exports = charactersRouter;