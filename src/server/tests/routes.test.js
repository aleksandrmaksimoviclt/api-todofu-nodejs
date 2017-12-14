import app from '../../index';
// import config from '../config/config';
import { clearDatabase } from '../helpers/clearDB';
import chai, { expect } from 'chai';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';
import sinon from 'sinon';
import List from '../models/list';
import User from '../models/user';

mongoose.models = {};
mongoose.modelSchemas = {};

describe('## Tasks API Tests', () => {

  let sandbox, list, user;

  beforeEach((done) => {
    clearDatabase(() => {
      sandbox = sinon.sandbox.create();

      List.create({
        name: 'testlist'
      })
        .then((l) => {
          list = l;
        });

      User.create({
        username: 'testuser',
        password: 'testuser'
      })
        .then((u) => {
          user = u;
          done();
        });

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

  describe('### GET /api/list', () => {
    it('should list all available lists', (done) => {
        request(app)
          .get('/api/list')
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body[0]._id).to.exist;
            expect(response.body[0].name).to.exist;
            expect(response.body[0]._id).to.equal(list._id.toString());
            expect(response.body[0].name).to.equal(list.name.toString());
            done();
          });
    });
  });

  describe('### GET /api/list/:listId', () => {
    it('should get testlist', (done) => {
        request(app)
          .get(`/api/list/${list._id.toString()}`)
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.name).to.exist;
            expect(response.body._id.toString()).to.equal(list._id.toString());
            expect(response.body.name.toString()).to.equal(list.name.toString());
            done();
          });
    });
  });

  describe('### POST /api/list', () => {

    const list2 = {
      name: 'list2'
    };

    it('should create a new list', (done) => {
        request(app)
          .post('/api/list')
          .send(list2)
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.name).to.exist;
            expect(response.body.name.toString()).to.equal(list2.name.toString());
            done();
          });
    });

  });

  describe('### PUT /api/list/:listId', () => {

    it('should get testlist', (done) => {
        request(app)
          .put(`/api/list/${list._id.toString()}`)
          .send({name: "i was changed"})
          .then(response => {
            expect(response.status).to.equal(204);
            done();
          });
    });

  });

  describe('### DELETE /api/list', () => {

    it('should delete newly created list', (done) => {
      list = new List({
        name: "The Chronicles of Narnia",
        cards: []
      });

      list.save((error, list) =>
        request(app)
        .delete(`/api/list/${list._id.toString()}`)
        .end((error, response) => {
          expect(response.status).to.equal(204);
          done();
        })
      );


    });

  });

});
