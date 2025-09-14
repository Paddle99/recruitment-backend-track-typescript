import { Router } from 'express';
import { InvoiceController } from '@controllers/Invoice.controller.js';
import { REQUEST_INPUT_TYPES, validate } from '@middlewares/validate.js';
import { IdParamSchema } from '@dto/Params.dto.js';
import {
    InvoiceCreateSchema,
    InvoiceUpdateSchema,
    InvoicePaginationSchema,
} from '@dto/Invoice.dto.js';

export class InvoiceRoute {
    public path = '/invoices';
    public router = Router();
    private controller: InvoiceController;

    constructor(controller: InvoiceController) {
        this.controller = controller;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(
            '/',
            this.controller.getAllInvoices.bind(this.controller)
        );

        this.router.get(
            '/paginated',
            validate(InvoicePaginationSchema, REQUEST_INPUT_TYPES.QUERY),
            this.controller.getInvoicePaginated.bind(this.controller)
        );

        this.router.post(
            '/create',
            validate(InvoiceCreateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.createInvoice.bind(this.controller)
        );

        this.router.get(
            '/:id',
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.getInvoiceById.bind(this.controller)
        );

        this.router.put(
            '/:id',
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            validate(InvoiceUpdateSchema, REQUEST_INPUT_TYPES.BODY),
            this.controller.updateInvoice.bind(this.controller)
        );

        this.router.delete(
            '/:id',
            validate(IdParamSchema, REQUEST_INPUT_TYPES.PARAMS),
            this.controller.deleteInvoice.bind(this.controller)
        );
    }
}
