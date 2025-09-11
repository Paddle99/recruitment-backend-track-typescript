import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';
import type { User } from '@prisma/client';
import type { IUserRepository } from './interfaces/UserRepository.interface.js';

export class UserRepository
    extends BaseRepository<typeof prisma.user, User>
    implements IUserRepository
{
    constructor() {
        super(prisma.user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.delegate.findUnique({ where: { email } });
    }
}
