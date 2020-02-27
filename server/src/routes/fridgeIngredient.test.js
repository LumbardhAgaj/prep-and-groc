const { expect, request } = require('chai');
const app = require('../../app');
const {
  fridgeIngredient,
  fridgeIngredientWithInvalidId,
  invalidFridgeIngredient,
  emptyFridgeIngredient
} = require('../test/fakes/fridgeIngredient');
const { user } = require('../test/fakes/user');
const {
  saveFridgeIngredient,
  deleteFridgeIngredient,
  deleteAllFridgeIngredients
} = require('../test/helpers/fridgeIngredient');
const { login, saveUser, deleteUser } = require('../test/helpers/user');
const convertUnitToDefaultUnit = require('../utils/convertUnitToDefaultUnit');
const convertAmountToDefaultUnitAmount = require('../utils/convertAmountToDefaultUnitAmount');

const FRIDGE_INGREDIENTS_ROUTE = '/fridge/ingredients';

describe('FridgeController routes', () => {
  const agent = request.agent(app);

  before(done => {
    saveUser(user)
      .then(() => agent.keepOpen())
      .then(() => login(agent, user))
      .then(() => done());
  });

  after(done => {
    deleteUser(user)
      .then(() => agent.close())
      .then(() => done());
  });

  describe('FridgeController.list()', () => {
    it('should return an AuthenticationError when unauthenticated user requests fridge ingredients list', done => {
      request(app)
        .get(FRIDGE_INGREDIENTS_ROUTE)
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body.name).to.equal('AuthenticationError');
          done();
        });
    });

    it('should return an empty list of fridge ingredients when there are not any saved', done => {
      agent.get(FRIDGE_INGREDIENTS_ROUTE).then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.items).to.eql([]);
        done();
      });
    });
  });

  describe('FridgeController.save()', () => {
    after(done => {
      deleteAllFridgeIngredients(user._id).then(() => done());
    });

    it('should save fridge ingredient', done => {
      agent
        .post(FRIDGE_INGREDIENTS_ROUTE)
        .type('application/json')
        .send(fridgeIngredient)
        .then(saveResponse => {
          expect(saveResponse).to.have.status(200);
          expect(saveResponse).to.be.json;
          expect(saveResponse.body.name).to.equal(fridgeIngredient.name);
          expect(saveResponse.body.unit).to.equal(
            convertUnitToDefaultUnit(fridgeIngredient.unit)
          );
          expect(saveResponse.body.amount).to.equal(
            convertAmountToDefaultUnitAmount(fridgeIngredient)
          );

          agent.get(FRIDGE_INGREDIENTS_ROUTE).then(listResponse => {
            expect(listResponse.body.items).to.have.length(1);
            done();
          });
        });
    });
  });

  describe('FridgeController.save() with duplicate save entry error', () => {
    before(done => {
      saveFridgeIngredient(fridgeIngredient, user._id).then(() => done());
    });
    after(done => {
      deleteFridgeIngredient(fridgeIngredient, user._id).then(() => done());
    });

    it('should return ValidationError when saving fridge ingredient that has already been saved.', done => {
      agent
        .post(FRIDGE_INGREDIENTS_ROUTE)
        .type('application/json')
        .send(fridgeIngredient)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.name).to.equal('ValidationError');
          expect(res.body.message).to.equal('Validation error occured.');
          done();
        });
    });
  });

  describe('FridgeController.save() with invalid user data', () => {
    it('should return ValidationError when saving fridge ingredient with empty fields(name,amount,unit)', done => {
      agent
        .post(FRIDGE_INGREDIENTS_ROUTE)
        .type('application/json')
        .send(emptyFridgeIngredient)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.name).to.equal('ValidationError');
          done();
        });
    });

    it(`should return ValidationError when saving fridge ingredient with invalid name(type number),
     amount(type String), unit(type unknown enum)`, done => {
      agent
        .post(FRIDGE_INGREDIENTS_ROUTE)
        .type('application/json')
        .send(invalidFridgeIngredient)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.name).to.equal('ValidationError');
          done();
        });
    });
  });

  describe('FridgeController.delete()', () => {
    describe('FridgeController.delete() with success', () => {
      before(done => {
        saveFridgeIngredient(fridgeIngredient, user._id).then(() => done());
      });

      it('should delete a fridge ingredient', done => {
        agent
          .del(`${FRIDGE_INGREDIENTS_ROUTE}/${fridgeIngredient._id}`)
          .then(delResponse => {
            expect(delResponse).to.have.status(204);

            agent.get(`${FRIDGE_INGREDIENTS_ROUTE}`).then(listResponse => {
              expect(listResponse.body.items).to.eql([]);
              done();
            });
          });
      });
    });

    describe('FridgeController.delete() with error', () => {
      it('shuould return ClientError when deleting an ingredient that has not been saved', done => {
        const ingredientId = fridgeIngredient._id;
        agent.del(`${FRIDGE_INGREDIENTS_ROUTE}/${ingredientId}`).then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
      });

      it('should return ValueError when deleting an ingredient with invalid object id', done => {
        const invalidItemId = fridgeIngredientWithInvalidId._id;
        agent.del(`${FRIDGE_INGREDIENTS_ROUTE}/${invalidItemId}`).then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.name).to.equal('ValueError');
          done();
        });
      });
    });
  });
});

module.exports.FRIDGE_INGREDIENTS_ROUTE = FRIDGE_INGREDIENTS_ROUTE;
