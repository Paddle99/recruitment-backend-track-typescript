import type { Request, Response, NextFunction } from 'express';
import type { InvoiceService } from '@services/Invoice.service.js';
import {
    InvoiceCreateSchema,
    InvoiceUpdateSchema,
    InvoiceSchema,
    InvoicesListSchema,
    InvoicePaginationSchema,
    type InvoicesPaginatedResponseDTO,
    InvoicesPaginatedResponseSchema,
} from '@dto/Invoice.dto.js';
import { ServerError } from '@middlewares/ServerError.js';

export class InvoiceController {
    constructor(private invoiceService: InvoiceService) {}

    public getAllInvoices = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const invoices = await this.invoiceService.getAllInvoices();

            if (!invoices) throw new ServerError('Invoices not found', 404);
            const result = InvoicesListSchema.parse(invoices);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public getInvoiceById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const invoice = await this.invoiceService.getInvoiceById(id);

            if (!invoice) throw new ServerError('Invoice not found', 404);

            const result = InvoiceSchema.parse(invoice);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public createInvoice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = InvoiceCreateSchema.parse(req.body);
            const invoice = await this.invoiceService.createInvoice(data);

            if (!invoice) throw new ServerError('Invoice not created', 400);

            return res.status(201).json(InvoiceSchema.parse(invoice));
        } catch (err) {
            next(err);
        }
    };

    public updateInvoice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const data = InvoiceUpdateSchema.parse(req.body);

            const invoice = await this.invoiceService.updateInvoice(id, data);

            if (!invoice) throw new ServerError('Invoice not found', 404);

            return res.status(200).json(InvoiceSchema.parse(invoice));
        } catch (err) {
            next(err);
        }
    };

    public deleteInvoice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const invoice = await this.invoiceService.deleteInvoice(id);

            if (!invoice) throw new ServerError('Invoice not found', 404);

            return res.status(200).json(InvoiceSchema.parse(invoice));
        } catch (err) {
            next(err);
        }
    };

    public getInvoicePaginated = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = InvoicePaginationSchema.parse(req.query);

            const { data, total } =
                await this.invoiceService.getInvoicePaginated(query);

            if (!data) throw new ServerError('Invoices not found', 404);

            const invoices = data.map((invoice) => ({
                ...invoice,
                subtotal: Number(invoice.subtotal),
                taxAmount: Number(invoice.taxAmount),
                total: Number(invoice.total),
            }));

            const response: InvoicesPaginatedResponseDTO =
                InvoicesPaginatedResponseSchema.parse({
                    total,
                    data: invoices,
                    skip: query.skip,
                    take: query.take,
                });

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };
}
