import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51KiYXMSA5VXtsPMRfP86E4Z8akxEksXpz9PmOJkWVxUREJ9YNCxaJPFKYaVgdNgg6YW3KFpRkrhTu32v3cQG5X4h00iEsISJZi';
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //build payload
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  //create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //build session
  const session = { jwt: token };
  // turn the session to json
  const sessionJSON = JSON.stringify(session);

  // json to encode base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return
  return [`session=${base64}`];
};
