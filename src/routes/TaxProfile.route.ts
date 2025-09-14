import { Router } from 'express';
import { TaxProfileController } from '@controllers/TaxProfile.controller.js';
import { REQUEST_INPUT_TYPES, validate } from '@middlewares/validate.js';
import { IdParamSchema } from '@dto/Params.dto.js';
import {
    TaxProfileCreateSchema,
    TaxProfileUpdateSchema,
    TaxProfilePaginationSchema,
} from '@dto/TaxProfile.dto.js';
import { authMiddleware } from '@middlewares/auth.js';

export class TaxProfileRoute {
    public path = '/tax-profiles';
    public router = Router();
    private controller: TaxProfileController;

    constructor(controller: TaxProfileController) {
        this.controller = controller;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(
            '/',
            authMiddleware,
            this.controller.getAllTaxProfiles.bind(this.controller)
        );

        this.router.get(
            '/paginated',
            authMiddleware,
            validate(TaxProfilePaginationSchema, REQUEST_INPUT_TYPES.QUERY),
            this.controller.getTaxProfilesWithPagination.bind(this.controller)
        );

        this.router.post(
            '/create',
            authMiddleware,
            validate(TaxProfileCreateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.createTaxProfile.bind(this.controller)
        );

        this.router.get(
            '/:id',
            authMiddleware,
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.getTaxProfileById.bind(this.controller)
        );

        this.router.put(
            '/:id',
            authMiddleware,
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            validate(TaxProfileUpdateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.updateTaxProfile.bind(this.controller)
        );

        this.router.delete(
            '/:id',
            authMiddleware,
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.deleteTaxProfile.bind(this.controller)
        );
    }
}
