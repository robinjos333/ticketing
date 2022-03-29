import request from 'supertest';
import { app } from '../../app';

it('fail when email does not exist', async () => {
    await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(400);
});

it('fails when invalid password supplied', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201);
    await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: 'passw'
    }).expect(400);
});

it('Get cookies when successfull signin', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201);
    const response = await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});