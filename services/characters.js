const charactersRepository = require('../repositories/characters');
const Character = require('../models/character');
const paginationRequest = require('./paginationRequest');

const limit = 10;

const getAll = async (req) => {
  const maxCount = await charactersRepository.getCount();
  const paginationData = paginationRequest.pagination(
    limit,
    maxCount,
    req,
    'characters',
  );
  const characters = await charactersRepository.getAll(
    limit,
    paginationData.offset,
  );

  const response = {
    maxCount: paginationData.maxCount,
    previousPage: paginationData.previousPageUrl,
    nextPage: paginationData.nextPageUrl,
    data: characters,
  };

  if (paginationData.page === 1) {
    response.previousPage = null;
  }

  if (paginationData.page === paginationData.lastPage) {
    response.nextPage = null;
  }

  return response;
};

const getById = async (id) => {
  const character = await charactersRepository.getById(id);
  if (!character) {
    const error = new Error('the character doesnt exist');
    error.status = 404;
    throw error;
  }
  return character;
};

const create = async (character) => {
  const newCharacter = new Character({
    name: character.name,
    creator: character.creator,
    firstApparition: character.firstApparition,
    imgUrl: character.imgUrl,
    videogames: character.videogames,
  });
  const response = await charactersRepository.create(newCharacter);
  if (!response) {
    const error = new Error('there was an error in creation of character');
    error.status = 403;
    throw error;
  }
  return response;
};

const update = async (data, id) => {
  const character = await charactersRepository.getById(id);
  if (!character) {
    const error = new Error('character not found');
    error.status = 404;
    throw error;
  }
  return charactersRepository.update(id, data);
};

const remove = async (id) => {
  const character = await charactersRepository.getById(id);
  if (!character) {
    const error = new Error('character not found');
    error.status = 404;
    throw error;
  }
  return charactersRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
