import type { User } from '@prisma/client';
import type { IBaseRepository } from './BaseRepository.interface.js';

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}
