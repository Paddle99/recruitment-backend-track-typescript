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
} from '../models/dto/User.dto.js';

export class UserController {
    constructor(private userService: UserService) {}

    public getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const users = await this.userService.getAllUsers();
            // add errors
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
            //   if (!user) throw new ServerError("User not found", 404);

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
            //   if (!user) throw new ServerError("User not found", 404);

            const result = UserSchema.parse(user);
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
            //   if (!user) throw new ServerError("User not found", 404);

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
            //   if (!user) throw new ServerError("User not found", 404);

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
