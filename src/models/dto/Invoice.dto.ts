import { z } from 'zod';

// request schemas
export const InvoiceCreateSchema = z
    .object({
        number: z.string().min(1).meta({ example: 'INV-001' }),
        status: z
            .enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED', 'OVERDUE'])
            .optional(),
        issueDate: z.string().refine((d) => !isNaN(Date.parse(d)), {
            message: 'Must be a valid date',
        }),
        dueDate: z.string().refine((d) => !isNaN(Date.parse(d)), {
            message: 'Must be a valid date',
        }),
        subtotal: z.number(),
        taxAmount: z.number(),
        total: z.number(),
        description: z.string().optional(),
        taxProfileId: z.string(),
    })
    .meta({ description: 'Schema for creating a new invoice' });

export const InvoiceUpdateSchema = z.object({
    number: z.string().optional(),
    status: z
        .enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED', 'OVERDUE'])
        .optional(),
    issueDate: z.string().optional(),
    dueDate: z.string().optional(),
    subtotal: z.number().optional(),
    taxAmount: z.number().optional(),
    total: z.number().optional(),
    description: z.string().optional(),
    taxProfileId: z.string().optional(),
});

// pagination + filters schema
export const InvoicePaginationSchema = z.object({
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
    number: z.string().optional(),
    status: z
        .enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED', 'OVERDUE'])
        .optional(),
    taxProfileId: z.string().optional(),
});

// response schemas
export const InvoiceSchema = z.object({
    id: z.string(),
    number: z.string(),
    status: z.enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED', 'OVERDUE']),
    issueDate: z.date(),
    dueDate: z.date(),
    subtotal: z.number(),
    taxAmount: z.number(),
    total: z.number(),
    description: z.string().nullable(),
    taxProfileId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const InvoicesListSchema = z.array(InvoiceSchema);

export const InvoicesPaginatedResponseSchema = z.object({
    total: z.number().meta({
        description: 'Total number of invoices available',
        example: 50,
    }),
    data: InvoicesListSchema.meta({
        description: 'List of invoices for the requested page',
    }),
    skip: z.number().meta({
        description: 'Number of invoices skipped (offset)',
        example: 0,
    }),
    take: z.number().meta({
        description: 'Maximum number of invoices returned',
        example: 10,
    }),
});

// types
export type InvoiceCreateDTO = z.infer<typeof InvoiceCreateSchema>;
export type InvoiceUpdateDTO = z.infer<typeof InvoiceUpdateSchema>;
export type InvoiceDTO = z.infer<typeof InvoiceSchema>;
export type InvoicesListDTO = z.infer<typeof InvoicesListSchema>;
export type InvoicePaginationDTO = z.infer<typeof InvoicePaginationSchema>;
export type InvoicesPaginatedResponseDTO = z.infer<
    typeof InvoicesPaginatedResponseSchema
>;
