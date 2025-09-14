import { z } from 'zod';

// request schemas
export const InvoiceItemCreateSchema = z
    .object({
        description: z.string().min(1),
        quantity: z.number(),
        unitPrice: z.number(),
        lineTotal: z.number(),
        invoiceId: z.string(),
    })
    .meta({ description: 'Schema for creating a new invoice item' });

export const InvoiceItemUpdateSchema = z.object({
    description: z.string().optional(),
    quantity: z.number().optional(),
    unitPrice: z.number().optional(),
    lineTotal: z.number().optional(),
    invoiceId: z.string().optional(),
});

// pagination + filters schema
export const InvoiceItemPaginationSchema = z.object({
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
    description: z.string().optional(),
    invoiceId: z.string().optional(),
});

// response schemas
export const InvoiceItemSchema = z.object({
    id: z.string(),
    description: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    lineTotal: z.number(),
    invoiceId: z.string(),
});

export const InvoiceItemsListSchema = z.array(InvoiceItemSchema);

export const InvoiceItemsPaginatedResponseSchema = z.object({
    total: z.number().meta({
        description: 'Total number of invoice items available',
        example: 50,
    }),
    data: InvoiceItemsListSchema.meta({
        description: 'List of invoice items for the requested page',
    }),
    skip: z.number().meta({
        description: 'Number of invoice items skipped (offset)',
        example: 0,
    }),
    take: z.number().meta({
        description: 'Maximum number of invoice items returned',
        example: 10,
    }),
});

// types
export type InvoiceItemCreateDTO = z.infer<typeof InvoiceItemCreateSchema>;
export type InvoiceItemUpdateDTO = z.infer<typeof InvoiceItemUpdateSchema>;
export type InvoiceItemDTO = z.infer<typeof InvoiceItemSchema>;
export type InvoiceItemsListDTO = z.infer<typeof InvoiceItemsListSchema>;
export type InvoiceItemPaginationDTO = z.infer<
    typeof InvoiceItemPaginationSchema
>;
export type InvoiceItemsPaginatedResponseDTO = z.infer<
    typeof InvoiceItemsPaginatedResponseSchema
>;
