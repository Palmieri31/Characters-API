const Character = require('../models/character');

const getAll = async (limit, offset) => {

};

const getById = async (id) => {
    const character = await Character.findById(id);
    return character;
};

const create = async (newCharacter) => {
    const character = await newCharacter.save();
    return character;
};

const update = async (id, data) => {
    const updateCharacter = await Character.findByIdAndUpdate(id, data, {
        new: true
      });
      return updateCharacter;
};

const remove = async (id) => {
    const response = await Character.findByIdAndDelete(id);
    return response; 
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};

