import { Router } from 'express';
import { InvoiceItemController } from '@controllers/InvoiceItem.controller.js';
import { REQUEST_INPUT_TYPES, validate } from '@middlewares/validate.js';
import { IdParamSchema } from '@dto/Params.dto.js';
import {
    InvoiceItemCreateSchema,
    InvoiceItemUpdateSchema,
    InvoiceItemPaginationSchema,
} from '@dto/InvoiceItem.dto.js';
import { authMiddleware } from '@middlewares/auth.js';

export class InvoiceItemRoute {
    public path = '/invoice-items';
    public router = Router();
    private controller: InvoiceItemController;

    constructor(controller: InvoiceItemController) {
        this.controller = controller;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(
            '/',
            authMiddleware,
            this.controller.getAllInvoiceItems.bind(this.controller)
        );

        this.router.get(
            '/paginated',
            authMiddleware,
            validate(InvoiceItemPaginationSchema, REQUEST_INPUT_TYPES.QUERY),
            this.controller.getInvoiceItemPaginated.bind(this.controller)
        );

        this.router.post(
            '/create',
            authMiddleware,
            validate(InvoiceItemCreateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.createInvoiceItem.bind(this.controller)
        );

        this.router.get(
            '/:id',
            authMiddleware,
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.getInvoiceItemById.bind(this.controller)
        );

        this.router.put(
            '/:id',
            authMiddleware,
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            validate(InvoiceItemUpdateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.updateInvoiceItem.bind(this.controller)
        );

        this.router.delete(
            '/:id',
            authMiddleware,
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.deleteInvoiceItem.bind(this.controller)
        );
    }
}
