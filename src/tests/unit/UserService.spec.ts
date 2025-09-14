/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, beforeEach, expect, vi } from 'vitest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from '@services/User.service.js';
import type { IUserRepository } from '@db/repositories/interfaces/UserRepository.interface.js';
import { LoginResponseSchema } from '@dto/User.dto.js';

describe('UserService - Unit Tests', () => {
    let service: UserService;
    let mockRepo: IUserRepository;

    beforeEach(() => {
        mockRepo = {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            findByEmail: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            findManyWithPagination: vi.fn(),
        };

        service = new UserService();
        (service as any).userRepository = mockRepo;

        vi.clearAllMocks();

        (bcrypt as any).hash = vi.fn();
        (bcrypt as any).compare = vi.fn();
        (jwt as any).sign = vi.fn();
    });

    it('should create a user with hashed password', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Mario',
            lastName: 'Rossi',
        };
        (bcrypt.hash as any).mockResolvedValue('hashedPassword');
        mockRepo.create = vi.fn().mockResolvedValue({
            ...userData,
            id: 'uuid',
            password: 'hashedPassword',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const user = await service.createUser(userData);
        expect(bcrypt.hash as any).toHaveBeenCalledWith('password123', 10);
        expect(mockRepo.create).toHaveBeenCalledWith({
            ...userData,
            password: 'hashedPassword',
        });
        expect(user.password).toBe('hashedPassword');
    });

    it('should login user and return JWT token', async () => {
        const user = {
            id: 'uuid',
            email: 'test@example.com',
            password: 'hashedPassword',
            firstName: 'Mario',
            lastName: 'Rossi',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        process.env.JWT_SECRET = 'secret';
        mockRepo.findByEmail = vi.fn().mockResolvedValue(user);
        (bcrypt.compare as any).mockResolvedValue(true);
        (jwt.sign as any).mockReturnValue('token123');
        const result = await service.login('test@example.com', 'password123');
        expect(mockRepo.findByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compare as any).toHaveBeenCalledWith(
            'password123',
            'hashedPassword'
        );
        expect(jwt.sign as any).toHaveBeenCalledWith(
            { userId: user.id, email: user.email },
            'secret',
            { expiresIn: '1h' }
        );
        expect(LoginResponseSchema.parse(result)).toBeDefined();
    });

    it('should return null if login fails', async () => {
        mockRepo.findByEmail = vi.fn().mockResolvedValue(null);
        const result = await service.login('noone@example.com', '123456');
        expect(result).toBeNull();
    });

    it('should get user by id', async () => {
        const user = { id: 'uuid', email: 'a@b.com' };
        mockRepo.findUnique = vi.fn().mockResolvedValue(user);
        const result = await service.getUserById('uuid');
        expect(result).toEqual(user);
        expect(mockRepo.findUnique).toHaveBeenCalledWith({
            where: { id: 'uuid' },
        });
    });

    it('should get all users', async () => {
        const users = [{ id: '1' }, { id: '2' }];
        mockRepo.findMany = vi.fn().mockResolvedValue(users);
        const result = await service.getAllUsers();
        expect(result).toEqual(users);
        expect(mockRepo.findMany).toHaveBeenCalled();
    });

    it('should update user', async () => {
        const updatedUser = { id: 'uuid', email: 'new@example.com' };
        mockRepo.update = vi.fn().mockResolvedValue(updatedUser);
        const result = await service.updateUser('uuid', {
            email: 'new@example.com',
        });
        expect(result).toEqual(updatedUser);
        expect(mockRepo.update).toHaveBeenCalledWith({
            where: { id: 'uuid' },
            data: { email: 'new@example.com' },
        });
    });

    it('should delete user', async () => {
        const deletedUser = { id: 'uuid' };
        mockRepo.delete = vi.fn().mockResolvedValue(deletedUser);
        const result = await service.deleteUser('uuid');
        expect(result).toEqual(deletedUser);
        expect(mockRepo.delete).toHaveBeenCalledWith({ where: { id: 'uuid' } });
    });

    it('should get users with pagination', async () => {
        const paginatedResult = { data: [{ id: '1' }], total: 1 };
        mockRepo.findManyWithPagination = vi
            .fn()
            .mockResolvedValue(paginatedResult);
        const result = await service.getUsersPaginated({
            skip: 0,
            take: 10,
            email: 'a@b.com',
        });
        expect(result).toEqual(paginatedResult);
        expect(mockRepo.findManyWithPagination).toHaveBeenCalledWith({
            skip: 0,
            take: 10,
            where: { email: { contains: 'a@b.com', mode: 'insensitive' } },
        });
    });
});
