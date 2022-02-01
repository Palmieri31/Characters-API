const charactersService = require('../services/characters');

const getAll = async (req, res, next) => {

};

const getById = async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const character = await charactersService.getById(characterId);
    res.status(200).json(character);
  } catch (error) {
    next(error);  
  }
};

const create = async (req, res, next) => {
  try {
    const response = await charactersService.create(req.body);
    res.status(200).json({
      success: true,
      msg: ` character: ${response.name} has been created`,
      character: response
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const response = await charactersService.update(req.body, characterId);
    res.status(200).json({
        success: true,
        msg: ` character: ${response.name} has been updated`,
        character: response
      });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { characterId } = req.params;
    await charactersService.remove(characterId);
    res.status(200).json({
        success: true,
        msg: ` character has been deleted`,
    });
  }catch (error) {
    next(error);
  }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};


