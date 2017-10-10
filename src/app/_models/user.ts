// the User model
export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// a sample User to use tests
export const testUser = {
    'id': 1,
    'email': 'test',
    'password': 'test',
    'firstName': 'test',
    'lastName': 'test'
};
