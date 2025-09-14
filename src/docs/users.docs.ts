import { EmailParamSchema, IdParamSchema } from '@dto/Params.dto.js';
import {
    UserSchema,
    UsersListSchema,
    UserCreateSchema,
    UserUpdateSchema,
    UserPaginationSchema,
    UsersPaginatedResponseSchema,
} from '@dto/User.dto.js';

export const getAllUsersPath = {
    '/users': {
        get: {
            summary: 'Get all users',
            description: 'Endpoint to retrieve the complete list of users',
            tags: ['Users'],
            responses: {
                '200': {
                    description: 'User list retrieved successfully',
                    content: {
                        'application/json': { schema: UsersListSchema },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getUserByIdPath = {
    '/users/{id}': {
        get: {
            summary: 'Get user by ID',
            description: 'Endpoint to retrieve a user by their ID',
            tags: ['Users'],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'User details retrieved successfully',
                    content: { 'application/json': { schema: UserSchema } },
                },
                '404': { description: 'User not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getUserByEmailPath = {
    '/users/email/{email}': {
        get: {
            summary: 'Get user by email',
            description: 'Endpoint to retrieve a user by their email address',
            tags: ['Users'],
            requestParams: { path: EmailParamSchema },
            responses: {
                '200': {
                    description: 'User details retrieved successfully',
                    content: { 'application/json': { schema: UserSchema } },
                },
                '404': { description: 'User not found' },
                '400': { description: 'Invalid email' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const createUserPath = {
    '/users/create': {
        post: {
            summary: 'Create a new user',
            description: 'Endpoint to create a new user in the system',
            tags: ['Users'],
            requestBody: {
                required: true,
                content: { 'application/json': { schema: UserCreateSchema } },
            },
            responses: {
                '201': {
                    description: 'User created successfully',
                    content: { 'application/json': { schema: UserSchema } },
                },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const updateUserPath = {
    '/users/{id}/update': {
        put: {
            summary: 'Update user by ID',
            description: 'Endpoint to update an existing user by ID',
            tags: ['Users'],
            requestParams: { path: IdParamSchema },
            requestBody: {
                required: true,
                content: { 'application/json': { schema: UserUpdateSchema } },
            },
            responses: {
                '200': {
                    description: 'User updated successfully',
                    content: { 'application/json': { schema: UserSchema } },
                },
                '404': { description: 'User not found' },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const deleteUserPath = {
    '/users/{id}/delete': {
        delete: {
            summary: 'Delete user by ID',
            description: 'Endpoint to delete a user by ID',
            tags: ['Users'],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'User deleted successfully',
                    content: { 'application/json': { schema: UserSchema } },
                },
                '404': { description: 'User not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getUsersPaginatedPath = {
    '/users/paginated': {
        get: {
            summary: 'Get paginated users',
            description:
                'Endpoint to retrieve a list of users with pagination support (skip, take) and optional filters on email, firstName, and lastName',
            tags: ['Users'],
            requestQuery: { query: UserPaginationSchema },
            responses: {
                '200': {
                    description:
                        'Paginated list of users retrieved successfully',
                    content: {
                        'application/json': {
                            schema: UsersPaginatedResponseSchema,
                        },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const userComponents = {
    schemas: {
        UserCreate: UserCreateSchema,
        UserUpdate: UserUpdateSchema,
        User: UserSchema,
        UsersList: UsersListSchema,
    },
};

export const userDocs = {
    getAllUsersPath,
    getUserByIdPath,
    getUserByEmailPath,
    createUserPath,
    updateUserPath,
    deleteUserPath,
    getUsersPaginatedPath,
};
