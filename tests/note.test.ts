import * as request from 'supertest';
import app from "../lib/config/app";
import Note from '../lib/modules/notes/schema';
import {
  userTwo,
  userOne,
  noteOne,
  noteTwo,
  setupDatabase } from './fixtures/db';

beforeEach(setupDatabase);

test('Should create note for a user', async () => {
  const response = await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      title: 'TheNote',
      body: [{ content: 'notenote' }]
    })
    .expect(200);
  const note = await Note.findById(response.body.DATA._id);
  expect(note).not.toBeNull();
});

test('Should get note by title', async () => {
  const response = await request(app)
    .get(`/api/note/title/${noteTwo.title}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.DATA.title).toEqual('wonderful note title');
});

test('Should get note by id', async () => {
  const response = await request(app)
    .get(`/api/note/${noteTwo._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
  const note =  await Note.findById(noteTwo._id);
  expect(note).not.toBeNull();
});

test('Should get all the notes of a user', async () => {

  const response = await request(app)
    .get('/api/notes')
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.DATA.length).toEqual(2);
});

test('Should not delete other users tasks', async () => {
  const response = await request(app)
    .delete(`/api/note/${noteOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400);
  const note =  await Note.findById(noteOne._id);
  expect(note).not.toBeNull();
});

test('Should not delete tasks if unauthenticated', async () => {
  const response = await request(app)
    .delete(`/api/note/${noteOne._id}`)
    .send()
    .expect(401);
});

test('Should delete user task', async () => {
  const response = await request(app)
    .delete(`/api/note/${noteTwo._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
  const note =  await Note.findById(noteTwo._id);
  expect(note).toBeNull();
});

test('Should update valid note fields', async () => {
  const response = await request(app)
    .put(`/api/note/${noteOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      body: [{
        content: 'updated value'
      }]
    })
    .expect(200);
  const note =  await Note.findById(noteOne._id);
  expect(note).toMatchObject({
    body: [{
      content: 'updated value'
    }]
  });
});

test('Should not update invalid note fields', async () => {
  const response = await request(app)
    .put(`/api/note/${noteOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Europe'
    })
    .expect(400);
});

