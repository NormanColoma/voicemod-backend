const registerUserMock = {
    register: () => {}
}
const container = require('../../../container');
const awilix = require('awilix');
container.register({
    registerUser: awilix.asValue(registerUserMock)
});

const { app, server } = require('../../../index');
const supertest = require('supertest');
const request = supertest(app);

describe('user controller', () => {
    test('should return 422 status when creating a user without any of its values', async () => {
        const res = await request.post('/users')
            .send({});

        const expectedErrors = [
            { message: 'Field cannot be blank', field: 'id' },
            { message: 'Field cannot be blank', field: 'name' },
            { message: 'Field cannot be blank', field: 'password' },
            { message: 'Field cannot be blank', field: 'email' },
        ]

        const { status, body, headers } = res;
        expect(status).toBe(422);
        expect(body).toEqual({ errors: expectedErrors });
        expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 status when creating a user with invalid email', async () => {
        const res = await request.post('/users')
            .send({
                id: 'id',
                name: 'name',
                email: 'email',
                password: 'password'
            });

        const expectedErrors = [
            { message: 'Provided value has no correct format for field', field: 'email' },
        ]

        const { status, body, headers } = res;
        expect(status).toBe(422);
        expect(body).toEqual({ errors: expectedErrors });
        expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 status when creating a user with a password shorter than 7 characters', async () => {
        const res = await request.post('/users')
            .send({
                id: 'id',
                name: 'name',
                email: 'email@mail.com',
                password: 'pass'
            });

        const expectedErrors = [
            { message: 'Provided value has no correct format for field', field: 'password' },
        ]

        const { status, body, headers } = res;
        expect(status).toBe(422);
        expect(body).toEqual({ errors: expectedErrors });
        expect(headers['content-type']).toContain('application/json');
    });

    test('should return 201 status when creating a user correctly', async () => {
        registerUserMock.register = () => {};

        const res = await request.post('/users')
            .send({
                id: 'id',
                name: 'name',
                email: 'email@email.com',
                password: 'password'
            });

        const { status, headers } = res;
        expect(status).toBe(201);
        expect(headers['content-type']).toContain('application/json');
    });

    afterAll(async () => {
        await server.close();
    });
});
