import type { IUserRepository } from '@db/repositories/interfaces/UserRepository.interface.js';
import { UserRepository } from '@db/repositories/UserRepository.js';
import type {
    UserCreateDTO,
    UserPaginationDTO,
    UserUpdateDTO,
} from '@dto/User.dto.js';

export class UserService {
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAllUsers() {
        return this.userRepository.findMany();
    }

    public async getUserById(id: string) {
        return this.userRepository.findUnique({ where: { id } });
    }

    public async getUserByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    public async createUser(data: UserCreateDTO) {
        console.log(data);

        return this.userRepository.create(data);
    }

    public async updateUser(id: string, data: UserUpdateDTO) {
        return this.userRepository.update({ where: { id }, data });
    }

    public async deleteUser(id: string) {
        return this.userRepository.delete({ where: { id } });
    }

    public async getUsersPaginated(paginationArgs: UserPaginationDTO) {
        const { skip, take, ...filters } = paginationArgs;

        const where = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value)
                acc[key] = { contains: value as string, mode: 'insensitive' };
            return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any);

        return this.userRepository.findManyWithPagination({
            skip,
            take,
            where,
        });
    }
}
