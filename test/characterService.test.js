const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const charactersService = require('../services/characters');
const charactersRepository = require('../repositories/characters');
const Character = require('../models/character');
const paginationRequest = require('../services/paginationRequest');

let mockedCharacterRepository;
let mockedPaginationRequest;
const characterName = 'character';
const characterCreator = 'creator';

const sandbox = sinon.createSandbox();

mocha.describe('test charactersService', () => {
  mocha.beforeEach(() => {
    mockedCharacterRepository = sinon.mock(charactersRepository);
  });

  mocha.afterEach(() => {
    sandbox.restore();
  });

  mocha.it('create character', async () => {
    const expectedCreatedCharacter = {
      name: characterName,
      creator: characterCreator,
    };

    const createStub = sandbox.stub(charactersRepository, 'create').returns(expectedCreatedCharacter);

    const character = await charactersRepository.create(expectedCreatedCharacter);

    chai.assert.equal(createStub.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(character.name, expectedCreatedCharacter.name);
    chai.assert.equal(character.creator, expectedCreatedCharacter.creator);
  });

  mocha.it('getAll character', async () => {
    const req = {
      query: { page: 1 },
    };
    const maxcountExpected = 15;
    const limit = 10;
    const countStub = sandbox.stub(charactersRepository, 'getCount').returns(maxcountExpected);

    const paginationDataExpected = {
      page: 1,
      lastPage: 3,
      offset: 0,
      maxCount: maxcountExpected,
      previousPageUrl: null,
      nextPageUrl: 'http://localhost:3000/characters?page=2',
    };

    mockedPaginationRequest = sandbox.mock(paginationRequest)
      .expects('pagination')
      .withExactArgs(limit, maxcountExpected, req, 'characters')
      .resolves(paginationDataExpected);

    const expectedGetAllCharacters = [
      {
        _id: 1,
        name: characterName,
        creator: characterCreator,
      },
    ];

    mockedCharacterRepository
      .expects('getAll')
      .resolves(expectedGetAllCharacters);

    const getAllresult = await charactersService.getAll(req);

    chai.assert.equal(countStub.calledOnce, true, 'asserts status is called 1 time');

    mockedCharacterRepository.verify();
    mockedPaginationRequest.verify();
  });

  mocha.it('getById character', async () => {
    const id = 1;

    const expectedGetByIdCharacter = {
      id: 1,
      name: characterName,
      creator: characterCreator,
    };
    mockedCharacterRepository
      .expects('getById')
      .withExactArgs(id)
      .resolves(expectedGetByIdCharacter);

    const result = await charactersService.getById(id);
    chai.assert.equal(result.id, expectedGetByIdCharacter.id);
    chai.assert.equal(result.name, expectedGetByIdCharacter.name);
    chai.assert.equal(result.creator, expectedGetByIdCharacter.creator);

    mockedCharacterRepository.verify();
  });
});
