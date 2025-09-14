import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createTestServer } from '../setup.js';
import {
    UserSchema,
    UsersListSchema,
    LoginResponseSchema,
    UsersPaginatedResponseSchema,
} from '@dto/User.dto.js';
import { validUserInsertDto } from '../fixtures/validUserInsert.js';

const app = createTestServer();

describe('UserController Integration Tests', () => {
    let userId: string;

    // Create
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users/create')
            .send(validUserInsertDto)
            .expect(201);

        UserSchema.parse(res.body);
        expect(res.body.email).toBe(validUserInsertDto.email);
        userId = res.body.id;
    });

    // Login
    it('should login and return JWT token', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: validUserInsertDto.email,
                password: validUserInsertDto.password,
            })
            .expect(200);

        LoginResponseSchema.parse(res.body);
        expect(res.body.user.email).toBe(validUserInsertDto.email);
        expect(res.body.token).toBeDefined();
    });

    // Get by id
    it('should get user by id', async () => {
        const res = await request(app).get(`/users/${userId}`).expect(200);
        UserSchema.parse(res.body);
        expect(res.body.id).toBe(userId);
    });

    // Get by email
    it('should get user by email', async () => {
        const res = await request(app)
            .get(`/users/email/${validUserInsertDto.email}`)
            .expect(200);
        UserSchema.parse(res.body);
        expect(res.body.email).toBe(validUserInsertDto.email);
    });

    // Get all users
    it('should get all users', async () => {
        const res = await request(app).get('/users').expect(200);
        UsersListSchema.parse(res.body);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Update
    it('should update a user', async () => {
        const res = await request(app)
            .patch(`/users/${userId}`)
            .send({ firstName: 'UpdatedName' })
            .expect(200);

        UserSchema.parse(res.body);
        expect(res.body.firstName).toBe('UpdatedName');
    });

    // Paginated
    it('should get users with pagination', async () => {
        const res = await request(app)
            .get('/users/paginated?skip=0&take=10')
            .expect(200);

        UsersPaginatedResponseSchema.parse(res.body);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    // Delete
    it('should delete a user', async () => {
        const res = await request(app).delete(`/users/${userId}`).expect(200);
        UserSchema.parse(res.body);
        expect(res.body.id).toBe(userId);
    });
});
