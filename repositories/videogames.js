const Videogame = require('../models/videogame');

const getAll = async (limit, offset) => {
  const videogames = await Videogame.find().skip(offset).limit(limit);
  return videogames;
};

const getById = async (id) => {
  const videogame = await Videogame.findById(id);
  return videogame;
};

const create = async (newVideogame) => {
  const videogame = await newVideogame.save();
  return videogame;
};

const update = async (id, data) => {
  const updateVideogame = await Videogame.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updateVideogame;
};

const remove = async (id) => {
  const response = await Videogame.findByIdAndDelete(id);
  return response;
};

const getCount = async () => {
  const response = await Videogame.count();
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
