# RS Clone (backend)

## Overview
Backend part for the final RS School project - Roam - Research Clone.

To create RESTful API we used **Express.js** framework.The most important advantage of using Express.js is that we were be able to get fast application development experience and it's easy to connect with databases such as **MongoDB**, that we used with **Mongoose ODM**. Instead of storing data in tables of rows or columns like SQL databases, each row in a MongoDB database is a document described in JSON.

**Bcrypt** - hashing users passwords.  
**Validator** - whenever we collect user data, we need to check whether the data entered is sensible.  
**Jsonwebtoken** - to create a unique token that users use as an identifier. This token verifies their identity, to authenticate.  
**Jest** - easy to use testing framework.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start-production
```

## Test

```bash
# unit tests
$ npm t
```
## Setting up the environment variables

```bash
# .env.sample
PORT=3000
MONGO_URL= the db url
TOKEN_SECRET= the jwt secret
```
