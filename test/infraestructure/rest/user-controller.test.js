const registerUserMock = {
    register: () => {}
};
const deleteUserMock = {
    delete: () => {}
};

const container = require('../../../container');
const awilix = require('awilix');
container.register({
    registerUser: awilix.asValue(registerUserMock),
    deleteUser: awilix.asValue(deleteUserMock)
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

        const { status } = res;
        expect(status).toBe(201);
    });


    test('should return 204 status when deleting a user correctly', async () => {
        const res = await request.delete('/users/12345')
            .send();

        const { status } = res;
        expect(status).toBe(204);
    });

    test('should return 500 status when deleting a user an error produced', async () => {
        deleteUserMock.delete = () => Promise.reject('Error');

        const res = await request.delete('/users/12345')
            .send();

        const { status, body, headers } = res;
        expect(status).toBe(500);
        expect(body).toEqual({ error: 'There was an internal server error' });
        expect(headers['content-type']).toContain('application/json');
    });

    afterAll(async () => {
        await server.close();
    });
});
