const express = require('express');
const videogamesController = require('../controllers/videogames');
const authsMiddleware = require('../middlewares/auths');
const videogamesMiddleware = require('../middlewares/videogames');
const videogamesRouter = express.Router();

videogamesRouter.post('/', videogamesMiddleware.validateVideogame, authsMiddleware.isAdmin, videogamesController.create);
videogamesRouter.get('/:videogameId',authsMiddleware.isLoggedUser, videogamesController.getById);
videogamesRouter.patch('/:videogameId', authsMiddleware.isAdmin, videogamesController.update);
videogamesRouter.delete('/:videogameId', authsMiddleware.isAdmin, videogamesController.remove);

module.exports = videogamesRouter;