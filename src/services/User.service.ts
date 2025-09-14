import type { IUserRepository } from '@db/repositories/interfaces/UserRepository.interface.js';
import { UserRepository } from '@db/repositories/UserRepository.js';
import type {
    UserCreateDTO,
    UserUpdateDTO,
    UserPaginationDTO,
    LoginResponseDTO,
} from '@dto/User.dto.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginResponseSchema } from '@dto/User.dto.js';

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
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.userRepository.create({
            ...data,
            password: hashedPassword,
        });
    }

    public async login(
        email: string,
        password: string
    ): Promise<LoginResponseDTO | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret) throw new Error('JWT_SECRET is not defined');

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            jwt_secret,
            { expiresIn: '1h' }
        );

        return LoginResponseSchema.parse({ user, token });
    }

    public async updateUser(id: string, data: UserUpdateDTO) {
        return this.userRepository.update({ where: { id }, data });
    }

    public async deleteUser(id: string) {
        return this.userRepository.delete({ where: { id } });
    }

    public async getUsersPaginated(paginationArgs: UserPaginationDTO) {
        const { skip, take, ...filters } = paginationArgs;

        const where = Object.entries(filters).reduce(
            (acc, [key, value]) => {
                if (value)
                    acc[key] = {
                        contains: value as string,
                        mode: 'insensitive',
                    };
                return acc;
            },
            {} as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
        );

        return this.userRepository.findManyWithPagination({
            skip,
            take,
            where,
        });
    }
}
