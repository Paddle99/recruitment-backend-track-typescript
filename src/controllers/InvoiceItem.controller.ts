import type { Request, Response, NextFunction } from 'express';
import type { InvoiceItemService } from '@services/InvoiceItem.service.js';
import {
    InvoiceItemCreateSchema,
    InvoiceItemUpdateSchema,
    InvoiceItemSchema,
    InvoiceItemsListSchema,
    InvoiceItemPaginationSchema,
    type InvoiceItemsPaginatedResponseDTO,
    InvoiceItemsPaginatedResponseSchema,
} from '@dto/InvoiceItem.dto.js';

export class InvoiceItemController {
    constructor(private invoiceItemService: InvoiceItemService) {}

    public getAllInvoiceItems = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const items = await this.invoiceItemService.getAllInvoiceItems();
            const result = InvoiceItemsListSchema.parse(items);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public getInvoiceItemById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const item = await this.invoiceItemService.getInvoiceItemById(id);
            const result = InvoiceItemSchema.parse(item);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public createInvoiceItem = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = InvoiceItemCreateSchema.parse(req.body);
            const item = await this.invoiceItemService.createInvoiceItem(data);
            return res.status(201).json(InvoiceItemSchema.parse(item));
        } catch (err) {
            next(err);
        }
    };

    public updateInvoiceItem = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const data = InvoiceItemUpdateSchema.parse(req.body);
            const item = await this.invoiceItemService.updateInvoiceItem(
                id,
                data
            );
            return res.status(200).json(InvoiceItemSchema.parse(item));
        } catch (err) {
            next(err);
        }
    };

    public deleteInvoiceItem = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const item = await this.invoiceItemService.deleteInvoiceItem(id);
            return res.status(200).json(InvoiceItemSchema.parse(item));
        } catch (err) {
            next(err);
        }
    };

    public getInvoiceItemPaginated = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = InvoiceItemPaginationSchema.parse(req.query);

            const { data, total } =
                await this.invoiceItemService.getInvoiceItemsPaginated(query);

            const items = data.map((item) => ({
                ...item,
                quantity: Number(item.quantity),
                unitPrice: Number(item.unitPrice),
                lineTotal: Number(item.lineTotal),
            }));

            const response: InvoiceItemsPaginatedResponseDTO =
                InvoiceItemsPaginatedResponseSchema.parse({
                    total,
                    data: items,
                    skip: query.skip,
                    take: query.take,
                });

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };
}
