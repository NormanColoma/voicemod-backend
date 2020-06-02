const MongoUserRepository = require('../../../../infraestructure/persistence/mongo/mongo-user-repository');
const User = require('../../../../domain/user/user');
const { ObjectID } = require('mongodb');

describe('insert', () => {
    let mongoUserRepository;


    test('should insert a user into collection', async () => {
        const insertOneMock = jest.fn(document => Promise.resolve());
        const collectionMock = {
            collection: (collection) => {
                return { insertOne: insertOneMock }
            },
            close: jest.fn()
        };
        const dbMock = {
            connect: () => collectionMock,
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
        expect(collectionMock.close.mock.calls.length).toBe(1);
        expect(insertOneMock.mock.calls[0][0]).toEqual(expectedUserDocument);
    });
});