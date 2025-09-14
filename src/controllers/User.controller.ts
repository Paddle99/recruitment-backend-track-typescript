import type { Request, Response, NextFunction } from 'express';
import type { UserService } from '@services/User.service.js';
import {
    UserCreateSchema,
    UserUpdateSchema,
    UserSchema,
    UsersListSchema,
    UserPaginationSchema,
    UsersPaginatedResponseSchema,
    type UserPaginatedResponseDTO,
    LoginSchema,
} from '../models/dto/User.dto.js';
import { ServerError } from '@middlewares/ServerError.js';

export class UserController {
    constructor(private userService: UserService) {}

    public getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const users = await this.userService.getAllUsers();

            if (!users) throw new ServerError('Users not found', 404);

            const result = UsersListSchema.parse(users);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;

            const user = await this.userService.getUserById(id);

            if (!user) throw new ServerError('User not found', 404);

            const result = UserSchema.parse(user);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public getUserByEmail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const email = req.params.email;

            const user = await this.userService.getUserByEmail(email);

            if (!user) throw new ServerError('User not found', 404);

            const result = UserSchema.parse(user);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = LoginSchema.parse(req.body);

            const result = await this.userService.login(email, password);

            if (!result) throw new ServerError('Invalid credentials', 401);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = UserCreateSchema.parse(req.body);

            const user = await this.userService.createUser(data);

            if (!user) throw new ServerError('User not created', 400);

            return res.status(201).json(UserSchema.parse(user));
        } catch (err) {
            next(err);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;

            const data = UserUpdateSchema.parse(req.body);

            const user = await this.userService.updateUser(id, data);

            if (!user) throw new ServerError('User not found', 404);

            return res.status(200).json(UserSchema.parse(user));
        } catch (err) {
            next(err);
        }
    };

    public deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;

            const user = await this.userService.deleteUser(id);

            if (!user) throw new ServerError('User not found', 404);

            return res.status(200).json(UserSchema.parse(user));
        } catch (err) {
            next(err);
        }
    };

    public getUsersWithPagination = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = UserPaginationSchema.parse(req.query);

            const { data, total } =
                await this.userService.getUsersPaginated(query);

            if (!data) throw new ServerError('Users not found', 404);

            const response: UserPaginatedResponseDTO =
                UsersPaginatedResponseSchema.parse({
                    total,
                    data,
                    skip: query.skip,
                    take: query.take,
                });

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };
}
