const UpdateUser = require('../../../application/update-user');
const User = require('../../../domain/user/user');

describe('update user use case', () => {
    let userRepositoryMock;
    let userHasherMock;
    let updateUser;
    let userRequest;

    beforeEach(() => {
        userRepositoryMock = {
            findByEmail: jest.fn(),
            save: jest.fn(),
        };
        userHasherMock = {
            hashPassword: jest.fn(),
            isSamePassword: jest.fn()
        };

        updateUser = new UpdateUser({ userRepository: userRepositoryMock, userHasher: userHasherMock});

        userRequest = {
            id: '5ed4e0fd385b75ad664e66d2',
            name: { firstName: 'firstName'},
            info: { email: 'email' },
            password:'password',
            newPassword: 'newPassword'
        };
    });

    it('should throw exception if does not exist a user with given email', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);

        try {
            await updateUser.update(userRequest);
        } catch (e) {
            expect(e.message).toEqual(`There is no user with email: ${ userRequest.info.email }`);
        }

        expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
        expect(userHasherMock.hashPassword.mock.calls.length).toBe(0);
        expect(userHasherMock.isSamePassword.mock.calls.length).toBe(0);
    });

    it('should throw exception if current password provided does not match', async () => {
        const currentUser = new User({
            id: userRequest.id,
            info: userRequest.info,
            name: userRequest.name,
            password: 'fakeHashedPassword'
        });

        userRepositoryMock.findByEmail.mockReturnValue(currentUser);
        userHasherMock.isSamePassword.mockReturnValue(false);

        try {
            await updateUser.update(userRequest);
        } catch (e) {
            expect(e.message).toEqual(`Incorrect password provided`);
        }

        expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
        expect(userHasherMock.hashPassword.mock.calls.length).toBe(0);
        expect(userHasherMock.isSamePassword.mock.calls.length).toBe(1);
        expect(userHasherMock.isSamePassword.mock.calls[0][0]).toBe(userRequest.password);
        expect(userHasherMock.isSamePassword.mock.calls[0][1]).toBe(currentUser.password);
    });


    it('should updateUserCorrectly', async () => {
        const currentUser = new User({
            id: userRequest.id,
            info: userRequest.info,
            name: userRequest.name,
            password: 'fakeHashedPassword'
        });

        userRepositoryMock.findByEmail.mockReturnValue(currentUser);
        userHasherMock.isSamePassword.mockReturnValue(true);
        userHasherMock.hashPassword.mockReturnValue('fakeNewHashed');

        try {
            await updateUser.update(userRequest);
            expect(true).toBeTruthy();
        } catch (e) {
            expect(true).toBeFalsy();
        }

        const expectedUpdatedUser = Object.assign({}, currentUser, { _password: 'fakeNewHashed' });

        expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
        expect(userRepositoryMock.save.mock.calls.length).toBe(1);
        expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUpdatedUser);
        expect(userHasherMock.hashPassword.mock.calls.length).toBe(1);
        expect(userHasherMock.hashPassword.mock.calls[0][0]).toBe(userRequest.newPassword);
        expect(userHasherMock.isSamePassword.mock.calls.length).toBe(1);
        expect(userHasherMock.isSamePassword.mock.calls[0][0]).toBe(userRequest.password);
        expect(userHasherMock.isSamePassword.mock.calls[0][1]).toBe(currentUser.password);
    });
});