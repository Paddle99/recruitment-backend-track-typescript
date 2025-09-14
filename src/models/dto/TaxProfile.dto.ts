import { z } from 'zod';

// request schemas
export const TaxProfileCreateSchema = z
    .object({
        name: z.string().min(1).meta({
            description: 'Name of the tax profile',
            example: 'Mario Rossi SRL',
        }),
        taxId: z.string().min(1).meta({
            description: 'Unique tax ID',
            example: 'IT12345678901',
        }),
        address: z.string().min(1).meta({
            description: 'Address of the tax profile',
            example: 'Via Roma 10',
        }),
        city: z.string().min(1).meta({
            description: 'City',
            example: 'Roma',
        }),
        postalCode: z.string().min(1).meta({
            description: 'Postal code',
            example: '00100',
        }),
        userId: z.string().meta({
            description: 'ID of the user owning this tax profile',
            example: 'd241582c-6a77-4004-ad7e-954ce2e8e0e1',
        }),
    })
    .meta({ description: 'Schema for creating a new tax profile' });

export const TaxProfileUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    taxId: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
});

// pagination + filters schema
export const TaxProfilePaginationSchema = z.object({
    skip: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0))
        .refine((val) => val >= 0, { message: 'skip must be >= 0' }),
    take: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 10))
        .refine((val) => val > 0 && val <= 100, {
            message: 'take must be between 1 and 100',
        }),
    name: z.string().optional(),
    taxId: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
});

// response schemas
export const TaxProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    taxId: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const TaxProfilesListSchema = z.array(TaxProfileSchema);

export const TaxProfilesPaginatedResponseSchema = z.object({
    total: z.number().meta({
        description: 'Total number of tax profiles available',
        example: 50,
    }),
    data: TaxProfilesListSchema.meta({
        description: 'List of tax profiles for the requested page',
    }),
    skip: z.number().meta({
        description: 'Number of tax profiles skipped (offset)',
        example: 0,
    }),
    take: z.number().meta({
        description: 'Maximum number of tax profiles returned',
        example: 10,
    }),
});

// types
export type TaxProfileCreateDTO = z.infer<typeof TaxProfileCreateSchema>;
export type TaxProfileUpdateDTO = z.infer<typeof TaxProfileUpdateSchema>;
export type TaxProfileDTO = z.infer<typeof TaxProfileSchema>;
export type TaxProfilesListDTO = z.infer<typeof TaxProfilesListSchema>;
export type TaxProfilePaginationDTO = z.infer<
    typeof TaxProfilePaginationSchema
>;
export type TaxProfilesPaginatedResponseDTO = z.infer<
    typeof TaxProfilesPaginatedResponseSchema
>;
