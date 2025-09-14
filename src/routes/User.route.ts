import { Router } from 'express';
import { UserController } from '@controllers/User.controller.js';
import { REQUEST_INPUT_TYPES, validate } from '@middlewares/validate.js';
import { EmailParamSchema, IdParamSchema } from '@dto/Params.dto.js';
import {
    UserCreateSchema,
    UserPaginationSchema,
    UserUpdateSchema,
} from '@dto/User.dto.js';

export class UserRoute {
    public path = '/users';
    public router = Router();
    private controller: UserController;

    constructor(controller: UserController) {
        this.controller = controller;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('/', this.controller.getAllUsers.bind(this.controller));

        this.router.get(
            '/paginated',
            validate(UserPaginationSchema, REQUEST_INPUT_TYPES.QUERY),
            this.controller.getUsersWithPagination.bind(this.controller)
        );

        this.router.get(
            '/:id',
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.getUserById.bind(this.controller)
        );

        this.router.get(
            '/email/:email',
            validate(EmailParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.getUserByEmail.bind(this.controller)
        );

        this.router.post(
            '/create',
            validate(UserCreateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.createUser.bind(this.controller)
        );

        this.router.put(
            '/:id',
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            validate(UserUpdateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.updateUser.bind(this.controller)
        );

        this.router.delete(
            '/:id',
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.deleteUser.bind(this.controller)
        );
    }
}
