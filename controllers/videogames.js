const videogamesService = require('../services/videogames');

const getAll = async (req, res, next) => {
  try {
    const videogames = await videogamesService.getAll(req);
    res.status(200).json({
      status: 200,
      response: videogames,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { videogameId } = req.params;
    const videogame = await videogamesService.getById(videogameId);
    res.status(200).json(videogame);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const response = await videogamesService.create(req.body);
    res.status(200).json({
      success: true,
      msg: `${response.title} has been created`,
      videogame: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { videogameId } = req.params;
    const response = await videogamesService.update(req.body, videogameId);
    res.status(200).json({
      success: true,
      msg: `${response.title} has been updated`,
      videogame: response,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { videogameId } = req.params;
    await videogamesService.remove(videogameId);
    res.status(200).json({
      success: true,
      msg: 'videogame has been deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
