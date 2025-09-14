import { IdParamSchema } from '@dto/Params.dto.js';
import {
    InvoiceSchema,
    InvoiceCreateSchema,
    InvoiceUpdateSchema,
    InvoicesListSchema,
    InvoicesPaginatedResponseSchema,
    InvoicePaginationSchema,
} from '@dto/Invoice.dto.js';

export const getAllInvoicesPath = {
    '/invoices': {
        get: {
            summary: 'Get all invoices',
            description: 'Endpoint to retrieve the complete list of invoices',
            tags: ['Invoices'],
            responses: {
                '200': {
                    description: 'Invoices list retrieved successfully',
                    content: {
                        'application/json': { schema: InvoicesListSchema },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getInvoiceByIdPath = {
    '/invoices/{id}': {
        get: {
            summary: 'Get invoice by ID',
            description: 'Endpoint to retrieve an invoice by its ID',
            tags: ['Invoices'],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'Invoice details retrieved successfully',
                    content: { 'application/json': { schema: InvoiceSchema } },
                },
                '404': { description: 'Invoice not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const createInvoicePath = {
    '/invoices/create': {
        post: {
            summary: 'Create a new invoice',
            description: 'Endpoint to create a new invoice',
            tags: ['Invoices'],
            requestBody: {
                required: true,
                content: {
                    'application/json': { schema: InvoiceCreateSchema },
                },
            },
            responses: {
                '201': {
                    description: 'Invoice created successfully',
                    content: { 'application/json': { schema: InvoiceSchema } },
                },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const updateInvoicePath = {
    '/invoices/{id}/update': {
        put: {
            summary: 'Update invoice by ID',
            description: 'Endpoint to update an existing invoice by ID',
            tags: ['Invoices'],
            requestParams: { path: IdParamSchema },
            requestBody: {
                required: true,
                content: {
                    'application/json': { schema: InvoiceUpdateSchema },
                },
            },
            responses: {
                '200': {
                    description: 'Invoice updated successfully',
                    content: { 'application/json': { schema: InvoiceSchema } },
                },
                '404': { description: 'Invoice not found' },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const deleteInvoicePath = {
    '/invoices/{id}/delete': {
        delete: {
            summary: 'Delete invoice by ID',
            description: 'Endpoint to delete an invoice by ID',
            tags: ['Invoices'],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'Invoice deleted successfully',
                    content: { 'application/json': { schema: InvoiceSchema } },
                },
                '404': { description: 'Invoice not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getInvoicesPaginatedPath = {
    '/invoices/paginated': {
        get: {
            summary: 'Get paginated invoices',
            description:
                'Endpoint to retrieve a list of invoices with pagination support (skip, take) and optional filters on number, status, and taxProfileId',
            tags: ['Invoices'],
            requestQuery: { query: InvoicePaginationSchema },
            responses: {
                '200': {
                    description:
                        'Paginated list of invoices retrieved successfully',
                    content: {
                        'application/json': {
                            schema: InvoicesPaginatedResponseSchema,
                        },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const invoiceComponents = {
    schemas: {
        InvoiceCreate: InvoiceCreateSchema,
        InvoiceUpdate: InvoiceUpdateSchema,
        Invoice: InvoiceSchema,
        InvoicesList: InvoicesListSchema,
    },
};

export const invoiceDocs = {
    getAllInvoicesPath,
    getInvoiceByIdPath,
    createInvoicePath,
    updateInvoicePath,
    deleteInvoicePath,
    getInvoicesPaginatedPath,
};
