const { expect } = require('chai');
const User = require('../../models/user');
const hashPassword = require('../../utils/hashPassword');

const login = (agent, { email, password }) =>
  agent
    .post('/users/login')
    .type('application/json')
    .send({ email, password })
    .then(res => {
      expect(res).to.have.status(200);
      expect(res).to.have.cookie('auth');
    });

const saveUser = async user => {
  const hashedPassword = await hashPassword(user.password);
  const newlyCreatedFakeUser = new User({ ...user, password: hashedPassword });
  return newlyCreatedFakeUser.save();
};

const deleteUser = user => User.findOneAndDelete({ email: user.email });

module.exports = {
  login,
  saveUser,
  deleteUser
};
