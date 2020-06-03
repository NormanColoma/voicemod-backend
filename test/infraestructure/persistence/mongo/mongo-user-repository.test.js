const MongoUserRepository = require('../../../../infraestructure/persistence/mongo/mongo-user-repository');
const User = require('../../../../domain/user/user');
const { ObjectID } = require('mongodb');
const { toDomain } = require('../../../../infraestructure/persistence/mongo/parser');

describe('user mongo repository', () => {
    let mongoUserRepository;

    test('should insert a user into collection', async () => {
        const insertOneMock = jest.fn(document => Promise.resolve());
        const collectionMock = {
            collection: (collection) => {
                return { insertOne: insertOneMock }
            },
        };
        const dbMock = {
            connect: () => collectionMock,
            disconnect: () => {}
        };

        mongoUserRepository = new MongoUserRepository({ db: dbMock });

        const user = new User({
            id: '5ed4e0fd385b75ad664e66d2',
            name: { firstName: 'firstName'},
            info: { email: 'email' },
            password:'password'
        });
        await mongoUserRepository.save(user);

        const expectedUserDocument = {
            _id: new ObjectID(user.id),
            name: user.name,
            info: user.info,
            password: user.password
        };

        expect(insertOneMock.mock.calls.length).toBe(1);
        expect(insertOneMock.mock.calls[0][0]).toEqual(expectedUserDocument);
    });

    test('should return null if no user found by email', async () => {
        const findOneMock = jest.fn(email => Promise.resolve());
        const collectionMock = {
            collection: (collection) => {
                return { findOne: findOneMock }
            }
        };
        const dbMock = {
            connect: () => collectionMock,
            disconnect: () => {}
        };

        mongoUserRepository = new MongoUserRepository({ db: dbMock });

        const actualUser = await mongoUserRepository.findByEmail('email');

        expect(findOneMock.mock.calls.length).toBe(1);
        expect(findOneMock.mock.calls[0][0]).toEqual({ email: 'email' });
        expect(actualUser).toEqual(null);
    });

    test('should return user found by email', async () => {
        const userDocument = {
            _id: new ObjectID('5ed4e0fd385b75ad664e66d2'),
            name:  { firstName: 'firstName'},
            info:  { email: 'email' },
            password: 'password'
        };

        const findOneMock = jest.fn(email => Promise.resolve(userDocument));
        const collectionMock = {
            collection: (collection) => {
                return { findOne: findOneMock }
            }
        };
        const dbMock = {
            connect: () => collectionMock,
            disconnect: () => {}
        };

        mongoUserRepository = new MongoUserRepository({ db: dbMock });
        const actualUser = await mongoUserRepository.findByEmail('email');

        expect(findOneMock.mock.calls.length).toBe(1);
        expect(findOneMock.mock.calls[0][0]).toEqual({ email: 'email' });

        const expectedUser = toDomain(userDocument);

        expect(actualUser).toEqual(expectedUser);
    });

    test('should remove user', async () => {
        const removeMock = jest.fn();
        const collectionMock = {
            collection: (collection) => {
                return { remove: removeMock }
            }
        };
        const dbMock = {
            connect: () => collectionMock,
            disconnect: () => {}
        };

        mongoUserRepository = new MongoUserRepository({ db: dbMock });
        await mongoUserRepository.delete('5ed4e0fd385b75ad664e66d2');

        expect(removeMock.mock.calls.length).toBe(1);
        expect(removeMock.mock.calls[0][0]).toEqual({ _id: new ObjectID('5ed4e0fd385b75ad664e66d2') });
    });
});