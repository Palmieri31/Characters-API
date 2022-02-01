const videogamesRepository = require('../repositories/videogames');
const Videogame = require('../models/videogame');

const getAll = async () => {

};

const getById = async (id) => {
  const videogame = await videogamesRepository.getById(id);
  if(!videogame) {
    const error = new Error('the videogame doesnt exist');
    error.status = 404;
    throw error;
  }
  return videogame;
};

const create = async (videogame) => {
  const newVideogame = new Videogame ({
    title: videogame.title,
    releaseDate: videogame.releaseDate,
    description: videogame.description,
    imgUrl: videogame.imgUrl
  })

  const response = await videogamesRepository.create(newVideogame);
  if(!response) {
    const error = new Error('there was an error in creation of videogame');
    error.status = 403;
    throw error;
  }
  return response;
};

const update = async (data, id) => {
  const videogame = await videogamesRepository.getById(id);
  if(!videogame) {
    const error = new Error('videogame not found');
    error.status = 404;
    throw error;
  }
  await videogamesRepository.update(id, data);
  return await videogamesRepository.getById(id);
};

const remove = async (id) => {
  const videogame = await videogamesRepository.getById(id);
  if(!videogame) {
    const error = new Error('videogame not found');
    error.status = 404;
    throw error;
  }
  return await videogamesRepository.remove(id);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};