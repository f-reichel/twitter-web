'use strict';

const assert = require('chai').assert;
const UserService = require('./user-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {
  
  var users = fixtures.users;
  var newUser = fixtures.newUser;
  
  const userService = new UserService(fixtures.userService);
  
  beforeEach(function () {
    userService.deleteAllUsers();
  });
  
  afterEach(function () {
    userService.deleteAllUsers();
  });
  
  test('create a user', function () {
    const returnedUser = userService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });
  
  test('get user', function () {
    const u1 = userService.createUser(newUser);
    const u2 = userService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });
  
  test('get invalid user', function () {
    const u1 = userService.getUser('1234');
    assert.isNull(u1);
    const u2 = userService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });
  
  test('delete a user', function () {
    const u = userService.createUser(newUser);
    assert(userService.getUser(u._id) != null);
    userService.deleteOneUser(u._id);
    assert(userService.getUser(u._id) == null);
  });
  
  test('get all users', function () {
    for (var u of users) {
      userService.createUser(u);
    }
    
    const allUsers = userService.getUsers();
    assert.equal(allUsers.length, users.length);
  });
  
  test('get users detail', function () {
    for (var u of users) {
      userService.createUser(u);
    }
    
    const allUsers = userService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });
  
  test('get all users empty', function () {
    const allUsers = userService.getUsers();
    assert.equal(allUsers.length, 0);
  });
});
