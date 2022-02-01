const express = require('express');
const videogamesController = require('../controllers/videogames');
const videogamesRouter = express.Router();

videogamesRouter.post('/', videogamesController.create);
videogamesRouter.get('/:videogameId', videogamesController.getById);
videogamesRouter.patch('/:videogameId', videogamesController.update);
videogamesRouter.delete('/:videogameId', videogamesController.remove);

module.exports = videogamesRouter;