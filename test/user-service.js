'use strict';

const SyncHttpService = require('./sync-http-client');
const baseUrl = 'http://localhost:4000';

class UserService {
  
  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }
  
  getUsers() {
    return this.httpService.get('/api/users');
  }
  
  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }
  
  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }
  
  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }
  
  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }
  
}

module.exports = UserService;
