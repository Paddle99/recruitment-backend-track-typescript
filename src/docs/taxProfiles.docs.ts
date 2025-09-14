import { IdParamSchema } from '@dto/Params.dto.js';
import {
    TaxProfileSchema,
    TaxProfileCreateSchema,
    TaxProfileUpdateSchema,
    TaxProfilesListSchema,
    TaxProfilePaginationSchema,
    TaxProfilesPaginatedResponseSchema,
} from '@dto/TaxProfile.dto.js';

export const getAllTaxProfilesPath = {
    '/tax-profiles': {
        get: {
            summary: 'Get all tax profiles',
            description:
                'Endpoint to retrieve the complete list of tax profiles',
            tags: ['TaxProfiles'],
            responses: {
                '200': {
                    description: 'Tax profiles list retrieved successfully',
                    content: {
                        'application/json': { schema: TaxProfilesListSchema },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getTaxProfileByIdPath = {
    '/tax-profiles/{id}': {
        get: {
            summary: 'Get tax profile by ID',
            description: 'Endpoint to retrieve a tax profile by its ID',
            tags: ['TaxProfiles'],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'Tax profile details retrieved successfully',
                    content: {
                        'application/json': { schema: TaxProfileSchema },
                    },
                },
                '404': { description: 'Tax profile not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const createTaxProfilePath = {
    '/tax-profiles/create': {
        post: {
            summary: 'Create a new tax profile',
            description: 'Endpoint to create a new tax profile',
            tags: ['TaxProfiles'],
            requestBody: {
                required: true,
                content: {
                    'application/json': { schema: TaxProfileCreateSchema },
                },
            },
            responses: {
                '201': {
                    description: 'Tax profile created successfully',
                    content: {
                        'application/json': { schema: TaxProfileSchema },
                    },
                },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const updateTaxProfilePath = {
    '/tax-profiles/{id}/update': {
        put: {
            summary: 'Update tax profile by ID',
            description: 'Endpoint to update an existing tax profile by ID',
            tags: ['TaxProfiles'],
            requestParams: { path: IdParamSchema },
            requestBody: {
                required: true,
                content: {
                    'application/json': { schema: TaxProfileUpdateSchema },
                },
            },
            responses: {
                '200': {
                    description: 'Tax profile updated successfully',
                    content: {
                        'application/json': { schema: TaxProfileSchema },
                    },
                },
                '404': { description: 'Tax profile not found' },
                '400': { description: 'Invalid input data' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const deleteTaxProfilePath = {
    '/tax-profiles/{id}/delete': {
        delete: {
            summary: 'Delete tax profile by ID',
            description: 'Endpoint to delete a tax profile by ID',
            tags: ['TaxProfiles'],
            requestParams: { path: IdParamSchema },
            responses: {
                '200': {
                    description: 'Tax profile deleted successfully',
                    content: {
                        'application/json': { schema: TaxProfileSchema },
                    },
                },
                '404': { description: 'Tax profile not found' },
                '400': { description: 'Invalid ID' },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const getTaxProfilesPaginatedPath = {
    '/tax-profiles/paginated': {
        get: {
            summary: 'Get paginated tax profiles',
            description:
                'Endpoint to retrieve a list of tax profiles with pagination support (skip, take) and optional filters on name, taxId, city, and postalCode',
            tags: ['TaxProfiles'],
            requestQuery: { query: TaxProfilePaginationSchema },
            responses: {
                '200': {
                    description:
                        'Paginated list of tax profiles retrieved successfully',
                    content: {
                        'application/json': {
                            schema: TaxProfilesPaginatedResponseSchema,
                        },
                    },
                },
                '500': { description: 'Internal server error' },
            },
        },
    },
};

export const taxProfileComponents = {
    schemas: {
        TaxProfileCreate: TaxProfileCreateSchema,
        TaxProfileUpdate: TaxProfileUpdateSchema,
        TaxProfile: TaxProfileSchema,
        TaxProfilesList: TaxProfilesListSchema,
    },
};

export const taxProfileDocs = {
    getAllTaxProfilesPath,
    getTaxProfileByIdPath,
    createTaxProfilePath,
    updateTaxProfilePath,
    deleteTaxProfilePath,
    getTaxProfilesPaginatedPath,
};
