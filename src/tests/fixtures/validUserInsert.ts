import type { UserCreateDTO } from '@dto/User.dto.js';

export const validUserInsertDto: UserCreateDTO = {
    email: 'mario.rossi@example.com',
    password: 'P@ssw0rd123',
    firstName: 'Mario',
    lastName: 'Rossi',
};
