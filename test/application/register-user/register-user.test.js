const RegisterUser = require('../../../application/register-user');
const User = require('../../../domain/user/user');

describe('register user use case', () => {
   let userRepositoryMock;
   let userHasherMock;
   let registerUser;
   let userRequest;

   beforeEach(() => {
      userRepositoryMock = {
         findByEmail: jest.fn(),
         save: jest.fn(),
      };
      userHasherMock = {
         hashPassword: jest.fn()
      };

      registerUser = new RegisterUser({ userRepository: userRepositoryMock, userHasher: userHasherMock});

      userRequest = {
         id: '5ed4e0fd385b75ad664e66d2',
         name: { firstName: 'firstName'},
         info: { email: 'email' },
         password:'password'
      };
   });

   it('should throw exception if already exists a user registered with given email', async () => {
      userRepositoryMock.findByEmail.mockReturnValue({});

      try {
         await registerUser.register(userRequest);
      } catch (e) {
         expect(e.message).toEqual(`Already exists user with given email: ${ userRequest.info.email }`);
      }

      expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
      expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
   });

   it('should register user correctly', async () => {
      userRepositoryMock.findByEmail.mockReturnValue(null);
      userHasherMock.hashPassword.mockReturnValue('fakeHashedPassword');

      await registerUser.register(userRequest);

      expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
      expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
      expect(userRepositoryMock.save.mock.calls.length).toBe(1);

      const expectedUser = new User({
         id: userRequest.id,
         info: userRequest.info,
         name: userRequest.name,
         password: 'fakeHashedPassword'
      });
      expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUser);
      expect(userHasherMock.hashPassword.mock.calls.length).toEqual(1);
      expect(userHasherMock.hashPassword.mock.calls[0][0]).toEqual('password');
   });
});