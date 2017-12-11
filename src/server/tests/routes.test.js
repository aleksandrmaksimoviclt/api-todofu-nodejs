import request from 'supertest';
import httpStatus from 'http-status';
import config from '../config/config';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import app from '../../index';
import { clearDatabase } from '../helpers/clearDB';
import User from '../models/user';

describe('## Tasks API Tests', () => {

  let sandbox, user;

  beforeEach((done) => {
    clearDatabase(() => {
      sandbox = sinon.sandbox.create();

      User.create({
        username: 'testuser',
        password: 'testuser'
      }).then((u) => {
        user = u;
        done();
      })
    });
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('### GET /api/users', () => {
    it('should list all available users', (done) => {
        request(app)
          .get('/api/users')
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body[0]._id).to.exist;
            expect(response.body[0].username).to.exist;
            expect(response.body[0].password).to.exist;
            expect(response.body[0]._id).to.equal(user._id.toString());
            expect(response.body[0].username).to.equal(user.username.toString());
            expect(response.body[0].password).to.equal(user.password.toString());
            done();
          });
    });
  });
});
