const registerUserMock = {
    register: () => {}
};
const deleteUserMock = {
    delete: () => {}
};

const loginUserMock = {
    login: () => {}
};

const updateUserMock = {
	update: () => {}
};

jest.mock('../../../infraestructure/rest/middlewares/auth-validator',
    () => jest.fn((req, res, next) =>
        next()));

const container = require('../../../container');
const awilix = require('awilix');
container.register({
    registerUser: awilix.asValue(registerUserMock),
    deleteUser: awilix.asValue(deleteUserMock),
    loginUser: awilix.asValue(loginUserMock),
    updateUser: awilix.asValue(updateUserMock)
});

const { app, server } = require('../../../index');
const supertest = require('supertest');
const request = supertest(app);

describe('user controller', () => {
    describe('POST user', () => {
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
    });

    describe('DELETE user', () => {
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
            expect(body).toEqual({ error: 'Error' });
            expect(headers['content-type']).toContain('application/json');
        });
    });

    describe('POST login', () => {
        test('should return 422 status when login without passing values', async () => {
            const res = await request.post('/login')
                .send({});

            const expectedErrors = [
                { message: 'Field cannot be blank', field: 'email' },
                { message: 'Field cannot be blank', field: 'password' },
            ]

            const { status, body, headers } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
            expect(headers['content-type']).toContain('application/json');
        });

        test('should return 422 status when login providing invalid email', async () => {
            const res = await request.post('/login')
                .send({
                    password: 'password',
                    email: 'email'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'email' },
            ]

            const { status, body, headers } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
            expect(headers['content-type']).toContain('application/json');
        });

        test('should return 200 status when login correctly', async () => {
            const token = 'token';
            loginUserMock.login = () => Promise.resolve(token);

            const res = await request.post('/login')
                .send({
                    password: 'password',
                    email: 'email@email.com'
                });

            const { status, body, headers } = res;
            expect(status).toBe(200);
            expect(body).toEqual({ token });
            expect(headers['content-type']).toContain('application/json');
        });

        test('should return 500 status when login an error ocurred', async () => {
            loginUserMock.login = () => Promise.reject('Error');

            const res = await request.post('/login')
                .send({
                    password: 'password',
                    email: 'email@email.com'
                });

            const { status, body, headers } = res;
            expect(status).toBe(500);
            expect(body).toEqual({ error: 'Error' });
            expect(headers['content-type']).toContain('application/json');
        });
    });

	describe('UPDATE user', () => {
		test('should return 422 status when updating a user without any of its values', async () => {
			const res = await request.put('/users')
				.send({});

			const expectedErrors = [
				{ message: 'Field cannot be blank', field: 'id' },
				{ message: 'Field cannot be blank', field: 'name' },
				{ message: 'Field cannot be blank', field: 'surnames' },
				{ message: 'Field cannot be blank', field: 'country' },
				{ message: 'Field cannot be blank', field: 'phone' },
				{ message: 'Field cannot be blank', field: 'postalCode' },
				{ message: 'Field cannot be blank', field: 'newPassword' },
				{ message: 'Field cannot be blank', field: 'password' },
				{ message: 'Field cannot be blank', field: 'email' },
			];

			const { status, body, headers } = res;
			expect(status).toBe(422);
			expect(body).toEqual({ errors: expectedErrors });
			expect(headers['content-type']).toContain('application/json');
		});

		test('should return 422 status when updating a user with invalid email', async () => {
			const res = await request.put('/users')
				.send({
					id: 'id',
					name: 'name',
					surnames: 'surnames',
					email: 'email',
					password: 'password',
					newPassword: 'newPassword',
					country: 'Spain',
					phone: '655444333',
					postalCode: '03690'
				});

			const expectedErrors = [
				{ message: 'Provided value has no correct format for field', field: 'email' },
			];

			const { status, body, headers } = res;
			expect(status).toBe(422);
			expect(body).toEqual({ errors: expectedErrors });
			expect(headers['content-type']).toContain('application/json');
		});

		test('should return 422 status when updating a user with a newPassword shorter than 7 characters', async () => {
			const res = await request.put('/users')
				.send({
					id: 'id',
					name: 'name',
					surnames: 'surnames',
					email: 'email@email.com',
					password: 'password',
					newPassword: 'short',
					country: 'Spain',
					phone: '655444333',
					postalCode: '03690'
				});

			const expectedErrors = [
				{ message: 'Provided value has no correct format for field', field: 'newPassword' },
			];

			const { status, body, headers } = res;
			expect(status).toBe(422);
			expect(body).toEqual({ errors: expectedErrors });
			expect(headers['content-type']).toContain('application/json');
		});

		test('should return 204 status when updating a user correctly', async () => {
			updateUserMock.update = () => {};

			const res = await request.put('/users')
				.send({
					id: 'id',
					name: 'name',
					surnames: 'surnames',
					email: 'email@email.com',
					password: 'password',
					newPassword: 'newPassword',
					country: 'Spain',
					phone: '655444333',
					postalCode: '03690'
				});

			const { status } = res;
			expect(status).toBe(204);
		});
	});

    afterAll(async () => {
        await server.close();
    });
});
