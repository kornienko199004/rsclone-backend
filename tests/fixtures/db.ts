import { sign } from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import User from '../../lib/modules/users/schema';
import Note from '../../lib/modules/notes/schema';

export const userOneId = new mongoose.Types.ObjectId();

export const userOne = {
  _id: userOneId,
  name: 'Mary',
  email: 'mary8@gmail.com',
  password: 'marymary',
  tokens: [{
    token: sign({ _id: userOneId }, process.env.TOKEN_SECRET)
  }]
};

export const userTwoId = new mongoose.Types.ObjectId();

export const userTwo = {
  _id: userTwoId,
  name: 'Gven-Stefany',
  email: 'gven@gmail.com',
  password: 'marymary',
  tokens: [{
    token: sign({ _id: userTwoId }, process.env.TOKEN_SECRET)
  }]
};

export const noteOne = {
  _id: new mongoose.Types.ObjectId(),
  title: 'great note title',
  body: [{
    content: 'the content of the great note'
  }],
  owner: userOne._id
};

export const noteTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'wonderful note title',
  body: [{
    content: 'the content of the wonderful note'
  }],
  owner: userTwo._id
};

export const noteThree = {
  _id: new mongoose.Types.ObjectId(),
  title: 'January 28th, 2021',
  body: [{
    content: 'the content of the wonderful note'
  }],
  isDaily: true,
  owner: userTwo._id
};

export const setupDatabase = async () => {
  await User.deleteMany();
  await Note.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Note(noteOne).save();
  await new Note(noteTwo).save();
  await new Note(noteThree).save();
};


