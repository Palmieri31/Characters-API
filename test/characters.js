/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const charactersController = require('../controllers/characters');
const charactersService = require('../services/characters');

let res;
let stubStatus;
let spyJson;
let spyNext;
let stub;
const characterName = 'character';
const characterCreator = 'creator';
const req = {
  body: { name: characterName, creator: characterCreator },
  params: { id: 1 },
};

mocha.describe('test charactersController', () => {
  mocha.beforeEach(() => {
    stubStatus = sinon.stub();
    spyJson = sinon.spy();
    stubStatus.returns({ json: spyJson });

    spyNext = sinon.spy();
    res = { status: stubStatus };
  });
  mocha.afterEach(() => {
    stub.restore();
  });

  mocha.it('create member success', async () => {
    const expectedCreatedCharacter = {
      name: characterName,
      creator: characterCreator,
    };

    const expectedJsonResult = {
      success: true,
      msg: `character: ${expectedCreatedCharacter.name} has been created`,
      character: expectedCreatedCharacter,
    };

    stub = sinon.stub(charactersService, 'create').returns(expectedCreatedCharacter);

    const character = await charactersController.create(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is a Array');
    chai.assert.isObject(spyJson.args[0][0], 'is a Object');
    chai.assert.equal(spyJson.args[0][0].success, expectedJsonResult.success);
    chai.assert.equal(spyJson.args[0][0].msg, expectedJsonResult.msg);
    chai.assert.equal(spyJson.args[0][0].character.name, expectedJsonResult.character.name);
    chai.assert.equal(spyJson.args[0][0].character.creator, expectedJsonResult.character.creator);
  });

  mocha.it('create character error', async () => {
    const expectedError = new Error('there was an error in member creation');
    expectedError.status = 403;

    stub = sinon.stub(charactersService, 'create').rejects(expectedError);

    const error = await charactersController.create(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0], expectedError);
  });

  mocha.it('getAll characters success', async () => {
    const expectedGetAllCharacters = [
      {
        _id: 1,
        name: characterName,
        creator: characterCreator,
      },
    ];

    const expectedJsonResult = {
      status: 200,
      response: expectedGetAllCharacters,
    };

    stub = sinon.stub(charactersService, 'getAll').returns(expectedGetAllCharacters);

    await charactersController.getAll(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is a Array');
    chai.assert.isObject(spyJson.args[0][0], 'is a Object');
    chai.assert.equal(spyJson.args[0][0].status, expectedJsonResult.status);
    chai.assert.equal(spyJson.args[0][0].response[0]._id, expectedJsonResult.response[0]._id);
    chai.assert.equal(spyJson.args[0][0].response[0].name, expectedJsonResult.response[0].name);
    chai.assert.equal(spyJson.args[0][0].response[0].creator, expectedJsonResult.response[0].creator);
  });

  mocha.it('GetAll characters error', async () => {
    const expectedError = new Error('there was an error in getAll characters');
    expectedError.status = 403;

    stub = sinon.stub(charactersService, 'getAll').rejects(expectedError);

    await charactersController.getAll(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0], expectedError);
  });

  mocha.it('getById character success', async () => {
    const expectedGetByIdCharacter = {
      _id: 1,
      name: characterName,
      creator: characterCreator,
    };

    stub = sinon.stub(charactersService, 'getById');
    stub.withArgs().returns(expectedGetByIdCharacter);

    await charactersController.getById(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is a Array');
    chai.assert.isObject(spyJson.args[0][0], 'is a Object');
    chai.assert.equal(spyJson.args[0][0]._id, expectedGetByIdCharacter._id);
    chai.assert.equal(spyJson.args[0][0].name, expectedGetByIdCharacter.name);
    chai.assert.equal(spyJson.args[0][0].creator, expectedGetByIdCharacter.creator);
  });

  mocha.it('GetById characters error', async () => {
    const expectedError = new Error('the character doesnt exist');
    expectedError.status = 404;

    const expectedErrorJson = {
      status: expectedError.status,
      message: expectedError.message,
    };

    stub = sinon.stub(charactersService, 'getById').rejects(expectedErrorJson);

    await charactersController.getById(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0].message, expectedError.message);
  });
});
