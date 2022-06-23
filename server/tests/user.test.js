import 'cross-fetch/polyfill';
import ApolloBoost, {gql} from 'apollo-boost'
import prisma from '../src/db/client';

const client = new ApolloBoost({
    uri: 'http://localhost:4002/graphql'
});

beforeAll(async () => {
    await prisma.comments.deleteMany();
    await prisma.posts.deleteMany();
    await prisma.users.deleteMany();
});

describe ('users', () => {
    test('Should create new User', async () => {
        const createUser = gql`
            mutation {
                createUser( input: {
                    name: "Tester", 
                    email: "tester@test.com",
                    password: "password"
                }) {
                    token,
                    user {
                        email,
                        name
                    }
                }
            }
        `;

        const response = await client.mutate({ mutation: createUser});
        expect(response.data.createUser.user.name).toBe("Tester");
    });

    test('Should return user data', async () => {
        const getUsers = gql`
            query {
                users {
                    email,
                    name
                }
            }
        `;

        const response = await client.query({ query: getUsers});
        expect(response.data.users.length).toBe(1);
        expect(response.data.users[0].email).toBe('');
        expect(response.data.users[0].name).toBe('Tester');
    });
});