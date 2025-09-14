import { IdParamSchema } from '@dto/Params.dto.js';
import {
    InvoiceItemSchema,
    InvoiceItemCreateSchema,
    InvoiceItemUpdateSchema,
    InvoiceItemsListSchema,
    InvoiceItemPaginationSchema,
    InvoiceItemsPaginatedResponseSchema,
} from '@dto/InvoiceItem.dto.js';

export const getAllInvoiceItemsPath = {
    '/invoice-items': {
        get: {
            summary: 'Get all invoice items',
            description:
                'Endpoint to retrieve the complete list of invoice items',
            tags: ['InvoiceItems'],
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Invoice items list retrieved successfully',
                    content: {
                        'application/json': { schema: InvoiceItemsListSchema },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getInvoiceItemByIdPath = {
    '/invoice-items/{id}': {
        get: {
            summary: 'Get invoice item by ID',
            description: 'Endpoint to retrieve an invoice item by its ID',
            tags: ['InvoiceItems'],
            security: [{ bearerAuth: [] }],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'Invoice item details retrieved successfully',
                    content: {
                        'application/json': { schema: InvoiceItemSchema },
                    },
                },
                '404': { description: 'Invoice item not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const createInvoiceItemPath = {
    '/invoice-items/create': {
        post: {
            summary: 'Create a new invoice item',
            description: 'Endpoint to create a new invoice item',
            tags: ['InvoiceItems'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': { schema: InvoiceItemCreateSchema },
                },
            },
            responses: {
                '201': {
                    description: 'Invoice item created successfully',
                    content: {
                        'application/json': { schema: InvoiceItemSchema },
                    },
                },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const updateInvoiceItemPath = {
    '/invoice-items/{id}/update': {
        put: {
            summary: 'Update invoice item by ID',
            description: 'Endpoint to update an existing invoice item by ID',
            tags: ['InvoiceItems'],
            requestParams: { path: IdParamSchema },
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': { schema: InvoiceItemUpdateSchema },
                },
            },
            responses: {
                '200': {
                    description: 'Invoice item updated successfully',
                    content: {
                        'application/json': { schema: InvoiceItemSchema },
                    },
                },
                '404': { description: 'Invoice item not found' },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const deleteInvoiceItemPath = {
    '/invoice-items/{id}/delete': {
        delete: {
            summary: 'Delete invoice item by ID',
            description: 'Endpoint to delete an invoice item by ID',
            tags: ['InvoiceItems'],
            security: [{ bearerAuth: [] }],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'Invoice item deleted successfully',
                    content: {
                        'application/json': { schema: InvoiceItemSchema },
                    },
                },
                '404': { description: 'Invoice item not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getInvoiceItemsPaginatedPath = {
    '/invoice-items/paginated': {
        get: {
            summary: 'Get paginated invoice items',
            description:
                'Endpoint to retrieve a list of invoice items with pagination support (skip, take) and optional filters on description and invoiceId',
            tags: ['InvoiceItems'],
            security: [{ bearerAuth: [] }],
            requestQuery: { query: InvoiceItemPaginationSchema },
            responses: {
                '200': {
                    description:
                        'Paginated list of invoice items retrieved successfully',
                    content: {
                        'application/json': {
                            schema: InvoiceItemsPaginatedResponseSchema,
                        },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const invoiceItemComponents = {
    schemas: {
        InvoiceItemCreate: InvoiceItemCreateSchema,
        InvoiceItemUpdate: InvoiceItemUpdateSchema,
        InvoiceItem: InvoiceItemSchema,
        InvoiceItemsList: InvoiceItemsListSchema,
    },
};

export const invoiceItemDocs = {
    getAllInvoiceItemsPath,
    getInvoiceItemByIdPath,
    createInvoiceItemPath,
    updateInvoiceItemPath,
    deleteInvoiceItemPath,
    getInvoiceItemsPaginatedPath,
};
