const DeleteUser = require('../../../application/delete-user');

describe('delete user use case', () => {
    let userRepositoryMock;
    let deleteUser;
    let deleteUserRequest;

    beforeEach(() => {
        userRepositoryMock = {
            delete: jest.fn(),
        };

        deleteUser = new DeleteUser({userRepository: userRepositoryMock});

        deleteUserRequest = {
            id: '5ed4e0fd385b75ad664e66d2',
        };
    });

    it('should delete user correctly', async () => {
        await deleteUser.delete(deleteUserRequest);

        expect(userRepositoryMock.delete.mock.calls.length).toBe(1);
        expect(userRepositoryMock.delete.mock.calls[0][0]).toBe(deleteUserRequest.id);
    });
});