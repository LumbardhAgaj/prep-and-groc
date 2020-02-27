const { expect, request } = require('chai');
const app = require('../../app');
const { user } = require('../test/fakes/user');
const {
  groceryItems,
  incompleteGroceryItem,
  invalidGroceryItem,
  completeGroceryItem,
  INVALID_GROCERY_ITEM_ID,
  GROCERY_ITEM_ID
} = require('../test/fakes/groceryItem');
const { login, saveUser, deleteUser } = require('../test/helpers/user');
const {
  saveGroceryItems,
  deleteGroceryItems,
  deleteAllGroceryItems
} = require('../test/helpers/groceryItem');

const GROCERY_ITEMS_SAVE_OR_UPDATE_MANY_ROUTE =
  '/grocery/items/save-or-update-many';
const GROCERY_ITEMS_ROUTE = '/grocery/items';
const GROCERY_ITEMS_MARK_COMPLETE_ROUTE = '/grocery/items/mark-complete';

describe('GroceryController routes', () => {
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

  describe('GroceryController.saveOrUpdateMany()', () => {
    after(done => {
      deleteAllGroceryItems(user._id).then(() => done());
    });

    it('should save many grocery items', done => {
      agent
        .post(GROCERY_ITEMS_SAVE_OR_UPDATE_MANY_ROUTE)
        .type('application/json')
        .send(groceryItems)
        .then(res => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return ValidationError when Grocery item with empty fields is saved', done => {
      const emptyGroceryItems = [{}];
      agent
        .post(GROCERY_ITEMS_SAVE_OR_UPDATE_MANY_ROUTE)
        .type('application/json')
        .send(emptyGroceryItems)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.true;
          expect(res.body.name).to.equal('ValidationError');
          done();
        });
    });

    it(`should return ValidationError when Grocery item with invalid name(number), \
    amount(string), unit(unknown), isCompleted(Number) is saved`, done => {
      agent
        .post(GROCERY_ITEMS_SAVE_OR_UPDATE_MANY_ROUTE)
        .type('application/json')
        .send(invalidGroceryItem)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.true;
          expect(res.body.name).to.equal('ValidationError');
          done();
        });
    });
  });

  describe('GroceryController list(), markItemComplete(), delete()', () => {
    beforeEach(done => {
      saveGroceryItems(groceryItems, user._id).then(() => done());
    });
    afterEach(done => {
      deleteGroceryItems(groceryItems, user._id).then(() => done());
    });

    describe('GroceryController.list()', () => {
      it('should return AuthenticationError when unauthenticated user requests grocery items', done => {
        request(app)
          .get(GROCERY_ITEMS_ROUTE)
          .then(res => {
            expect(res).to.have.status(401);
            expect(res.body.error).to.be.true;
            expect(res.body.name).to.equal('AuthenticationError');
            done();
          });
      });

      it('should return grocery items list with saved items', done => {
        agent.get(GROCERY_ITEMS_ROUTE).then(res => {
          expect(res).to.have.status(200);
          expect(res.body.items).to.have.length(groceryItems.length);
          done();
        });
      });
    });

    describe('GroceryController.markItemComplete()', () => {
      it('should mark an incomplete grocery item as complete', done => {
        agent
          .put(
            `${GROCERY_ITEMS_MARK_COMPLETE_ROUTE}/${incompleteGroceryItem._id}`
          )
          .then(res => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should return ValueError when grocery item with invalid object id is marked as complete', done => {
        agent
          .put(
            `${GROCERY_ITEMS_MARK_COMPLETE_ROUTE}/${INVALID_GROCERY_ITEM_ID}`
          )
          .type('application/json')
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.error).to.be.true;
            expect(res.body.name).to.equal('ValueError');
            done();
          });
      });

      it('should return ObjectNotFoundError when grocery item not found in the list is marked as complete', done => {
        agent
          .put(`${GROCERY_ITEMS_MARK_COMPLETE_ROUTE}/${GROCERY_ITEM_ID}`)
          .type('application/json')
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.error).to.be.true;
            expect(res.body.name).to.equal('ObjectNotFoundError');
            expect(res.body.message).to.equal(
              `Grocery item with id:${GROCERY_ITEM_ID} was not found`
            );
            done();
          });
      });
    });

    describe('GroceryController.delete()', () => {
      it('should delete completed grocery item', done => {
        agent
          .del(`${GROCERY_ITEMS_ROUTE}/${completeGroceryItem._id}`)
          .then(res => {
            expect(res).to.have.status(204);
            done();
          });
      });

      it('should return ClientError when incomplete grocery item is deleted', done => {
        agent
          .del(`${GROCERY_ITEMS_ROUTE}/${incompleteGroceryItem._id}`)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.error).to.be.true;
            expect(res.body.name).to.equal('ClientError');
            done();
          });
      });

      it('should return ObjectNotFoundError when grocery item not found in grocery list is deleted', done => {
        agent.del(`${GROCERY_ITEMS_ROUTE}/${GROCERY_ITEM_ID}`).then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.true;
          expect(res.body.name).to.equal('ObjectNotFoundError');
          done();
        });
      });

      it('should return ValueError when grocery item with invalid object id is deleted', done => {
        agent
          .del(`${GROCERY_ITEMS_ROUTE}/${INVALID_GROCERY_ITEM_ID}`)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.error).to.be.true;
            expect(res.body.name).to.equal('ValueError');
            expect(res.body.message).to.equal('Invalid item id');
            done();
          });
      });
    });
  });
});
