/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const videogamesController = require('../controllers/videogames');
const videogamesService = require('../services/videogames');

let mockedVideogamesService;
let res;
let stubStatus;
let spyJson;
let spyNext;
let stub;
const videogameTitle = 'videogame';
const videogameDescription = 'description';
const req = {
  body: { title: videogameTitle, description: videogameDescription },
  params: { _id: 1 },
};

mocha.describe('test videogamesController', () => {
  mocha.beforeEach(() => {
    mockedVideogamesService = sinon.mock(videogamesService);
    stubStatus = sinon.stub();
    spyJson = sinon.spy();
    stubStatus.returns({ json: spyJson });

    spyNext = sinon.spy();
    res = { status: stubStatus };
  });
  mocha.afterEach(() => {
    stub.restore();
  });

  mocha.it('create videogame success', async () => {
    const expectedCreatedVideogame = {
      title: videogameTitle,
      description: videogameDescription,
    };

    const expectedJsonResult = {
      success: true,
      msg: `${expectedCreatedVideogame.title} has been created`,
      videogame: expectedCreatedVideogame,
    };

    stub = sinon.stub(videogamesService, 'create').returns(expectedCreatedVideogame);

    await videogamesController.create(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is a Array');
    chai.assert.isObject(spyJson.args[0][0], 'is a Object');
    chai.assert.equal(spyJson.args[0][0].success, expectedJsonResult.success);
    chai.assert.equal(spyJson.args[0][0].msg, expectedJsonResult.msg);
    chai.assert.equal(spyJson.args[0][0].videogame.title, expectedJsonResult.videogame.title);
    chai.assert.equal(spyJson.args[0][0].videogame.description, expectedJsonResult.videogame.description);
  });

  mocha.it('create videogame error', async () => {
    const expectedError = new Error('there was an error in creation of videogame');
    expectedError.status = 403;

    stub = sinon.stub(videogamesService, 'create').rejects(expectedError);

    const error = await videogamesController.create(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0], expectedError);
  });

  mocha.it('getAll videogames success', async () => {
    const expectedGetAllVideogames = [
      {
        _id: 1,
        title: videogameTitle,
        description: videogameDescription,
      },
    ];

    const expectedJsonResult = {
      status: 200,
      response: expectedGetAllVideogames,
    };

    stub = sinon.stub(videogamesService, 'getAll').returns(expectedGetAllVideogames);

    await videogamesController.getAll(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is a Array');
    chai.assert.isObject(spyJson.args[0][0], 'is a Object');
    chai.assert.equal(spyJson.args[0][0].status, expectedJsonResult.status);
    chai.assert.equal(spyJson.args[0][0].response[0]._id, expectedJsonResult.response[0]._id);
    chai.assert.equal(spyJson.args[0][0].response[0].title, expectedJsonResult.response[0].title);
    chai.assert.equal(spyJson.args[0][0].response[0].description, expectedJsonResult.response[0].description);
  });

  mocha.it('GetAll videogames error', async () => {
    const expectedError = new Error('there was an error in getAll videogames');
    expectedError.status = 403;

    stub = sinon.stub(videogamesService, 'getAll').rejects(expectedError);

    await videogamesController.getAll(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0], expectedError);
  });

  mocha.it('getById videogame success', async () => {
    const expectedGetByIdVideogame = {
      _id: 1,
      title: videogameTitle,
      description: videogameDescription,
    };

    stub = sinon.stub(videogamesService, 'getById').callsFake((id) => {
      if (id === expectedGetByIdVideogame._id) {
        return expectedGetByIdVideogame;
      }
    });

    await videogamesController.getById(req, res, spyNext);

    const result = stub(req.params._id);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isObject(result, 'is a Object');
    chai.assert.equal(result._id, expectedGetByIdVideogame._id);
    chai.assert.equal(result.title, expectedGetByIdVideogame.title);
    chai.assert.equal(result.description, expectedGetByIdVideogame.description);
  });

  mocha.it('GetById characters error', async () => {
    const expectedError = new Error('the videogame doesnt exist');
    expectedError.status = 404;

    const expectedErrorJson = {
      status: expectedError.status,
      message: expectedError.message,
    };

    stub = sinon.stub(videogamesService, 'getById').rejects(expectedErrorJson);

    await videogamesController.getById(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0].message, expectedError.message);
  });

  mocha.it('update videogame success', async () => {
    const expectedUpdateVideogame = {
      _id: 1,
      title: videogameTitle,
      description: videogameDescription,
    };

    const expectedJsonResult = {
      success: true,
      msg: `${expectedUpdateVideogame.title} has been updated`,
      videogame: expectedUpdateVideogame,
    };

    mockedVideogamesService
      .expects('update')
      .withExactArgs(req.body, req.params.id)
      .resolves(expectedUpdateVideogame);

    await videogamesController.update(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is array');
    chai.assert.isObject(spyJson.args[0][0], 'is an object');
    chai.assert.equal(spyJson.args[0][0].success, expectedJsonResult.success);
    chai.assert.equal(spyJson.args[0][0].msg, expectedJsonResult.msg);
    chai.assert.isObject(spyJson.args[0][0].videogame, 'is an object');
    chai.assert.equal(spyJson.args[0][0].videogame.id, expectedJsonResult.videogame.id);
    chai.assert.equal(spyJson.args[0][0].videogame.title, expectedJsonResult.videogame.title);
    chai.assert.equal(spyJson.args[0][0].videogame.description, expectedJsonResult.videogame.description);

    mockedVideogamesService.verify();
  });

  mocha.it('update videogame error', async () => {
    const expectedError = new Error('videogame not found');
    expectedError.status = 404;

    const expectedErrorJson = {
      status: expectedError.status,
      message: expectedError.message,
    };

    stub = sinon.stub(videogamesService, 'update').rejects(expectedErrorJson);

    await videogamesController.update(req, res, spyNext);

    chai.assert.equal(spyNext.args[0][0].message, expectedError.message);
  });

  mocha.it('remove videogame success', async () => {
    const expectedResult = {
      success: true,
      msg: 'videogame has been deleted',
    };

    mockedVideogamesService
      .expects('remove')
      .withExactArgs(req.params.id)
      .resolves(expectedResult);

    await videogamesController.remove(req, res, spyNext);

    chai.assert.equal(res.status.calledOnce, true, 'asserts status is called 1 time');
    chai.assert.equal(res.status.args[0], 200, 'asserts status parameter is 200');
    chai.assert.equal(spyJson.calledOnce, true, 'asserts json is called 1 time');
    chai.assert.isArray(spyJson.args[0], 'is array');
    chai.assert.isObject(spyJson.args[0][0], 'is an object');
    chai.assert.equal(spyJson.args[0][0].msg, expectedResult.msg);

    mockedVideogamesService.verify();
  });

  mocha.it('remove videogame error', async () => {
    const expectedError = new Error('videogame not found');
    expectedError.status = 404;

    const expectedErrorJson = {
      status: expectedError.status,
      message: expectedError.message,
    };

    mockedVideogamesService
      .expects('remove')
      .withExactArgs(req.params.id)
      .rejects(expectedErrorJson);

    await videogamesController.remove(req, res, spyNext);
    chai.assert.equal(spyNext.calledOnce, true);
    chai.assert.equal(spyNext.args[0][0].message, expectedError.message);
    chai.assert.equal(spyNext.args[0][0].status, expectedError.status);

    mockedVideogamesService.verify();
  });
});
