const User = require('../../../domain/user/user');

describe('user creation', () => {
    test('should throw error if id is null', () => {
        try {
            new User({ id: null });
        } catch(ex) {
            expect(ex.message).toBe('Id must not be null');
        }
    });

    test('should throw error if password is null', () => {
        try {
            new User({ id: 'id', name: { firstName: 'firstName'}, password: null });
        } catch(ex) {
            expect(ex.message).toBe('Password must not be null');
        }
    });

    test('should throw error if password shorter than 7 characters', () => {
        try {
            new User({ id: 'id', name: { firstName: 'firstName'}, password: '123456' });
        } catch(ex) {
            expect(ex.message).toBe('Password must contain at least 7 characters');
        }
    });

    test('should throw error if firstName is null', () => {
        try {
            new User({ id: 'id', password: '123456' });
        } catch(ex) {
            expect(ex.message).toBe('User name must not be null');
        }
    });

    test('should throw error if email is null', () => {
        try {
            new User({ id: 'id', name: { firstName: 'firstName'}, password: '1234567' });
        } catch(ex) {
            expect(ex.message).toBe('Email must not be null');
        }
    });

    test('should create user correctly', () => {
        const actualUser = new User({
            id: 'id',
            name: { firstName: 'firstName', surnames: 'surnames'},
            password: '1234567',
            info: { email: 'email', country: 'country', phone: 'phone', postalCode: 'postalCode'}
        });

        const expectedUser = {
            _id: 'id',
            _name: { _firstName: 'firstName', _surnames: 'surnames'},
            _password: '1234567',
            _info: { _email: 'email', _country: 'country', _phone: 'phone', _postalCode: 'postalCode'}
        };

        expect(actualUser).toEqual(expectedUser);
    });
})