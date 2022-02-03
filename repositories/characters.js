const Character = require('../models/character');

const getAll = async (limit, offset) => {
  const characters = await Character.find().skip(offset).limit(limit);
  return characters;
};

const getById = async (id) => {
  const character = await Character.findById({ _id: id }).populate({ path: 'videogames', model: 'Videogame' });
  return character;
};

const create = async (newCharacter) => {
  const character = await newCharacter.save();
  return character;
};

const update = async (id, data) => {
  const updateCharacter = await Character.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updateCharacter;
};

const remove = async (id) => {
  const response = await Character.findByIdAndDelete(id);
  return response;
};

const getCount = async () => {
  const response = await Character.count();
  return response;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getCount,
};
