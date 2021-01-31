/// <reference types="jest" />

import * as request from 'supertest';
import app from "../lib/config/app";
import User from '../lib/modules/users/schema';
import { userOneId, userOne, setupDatabase } from './fixtures/db'


beforeEach(setupDatabase);

test('Should signup a new user', async () => {
  const response = await request(app)
  .post('/api/user')
  .send({
    name: 'Mary',
    email: 'mary@gmail.com',
    password: 'marymary'
  })
  .expect(200);

  const user = await User.findById(response.body.DATA._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    DATA: {
      name: 'Mary',
      email: 'mary@gmail.com',
    },
  });
  expect(user.password).not.toBe('marymary');
});
test('Should not signup user with invalid email', async () => {
  const response = await request(app)
  .post('/api/user')
  .send({
    name: 'Mary',
    email: 'abcd',
    password: 'marymary'
  })
  .expect(500);
});

test('Should not signup user with invalid password', async () => {
  const response = await request(app)
  .post('/api/user')
  .send({
    name: 'Mary',
    email: 'mary@gmail.com',
    password: 'password'
  })
  .expect(500);
});

test('Should login existing user', async () => {
  const response = await request(app)
  .post('/api/login')
  .send({
    email: userOne.email,
    password: userOne.password,
  })
  .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
  await request(app)
  .post('/api/login')
  .send({
    email: userOne.email,
    password: 'failuref',
  })
  .expect(500);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/api/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/api/user/me')
    .send()
    .expect(401);
});

test('Should delete account for a user', async () => {
  await request(app)
    .delete('/api/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();

});

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/api/user/me')
    .send()
    .expect(401);
});

test('Should update valid user fields', async () => {
  const response = await request(app)
    .put('/api/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Mary-Jane'
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Mary-Jane');
});

test('Should not update invalid user fields', async () => {
  const response = await request(app)
    .put('/api/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Europe'
    })
    .expect(400);
});
