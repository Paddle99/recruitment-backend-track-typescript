import { z } from 'zod';

//TODO: add regex for emails and password complexity

// request schemas
export const UserCreateSchema = z
    .object({
        email: z.email().meta({
            description: 'Email address of the user',
            example: 'user@example.com',
        }),
        password: z.string().min(6).meta({
            description: 'Password (min 6 chars)',
            example: 'P@ssw0rd123',
        }),
        firstName: z.string().min(1).meta({
            description: 'First name of the user',
            example: 'Mario',
        }),
        lastName: z.string().min(1).meta({
            description: 'Last name of the user',
            example: 'Rossi',
        }),
    })
    .meta({
        description: 'Schema for creating a new user',
    });

export const UserUpdateSchema = z.object({
    email: z.email().optional().meta({
        description: 'New email address (optional)',
        example: 'new.email@example.com',
    }),
    password: z.string().min(6).optional().meta({
        description: 'New password (min 6 chars, optional)',
        example: 'NewP@ssword1',
    }),
    firstName: z.string().min(1).optional().meta({
        description: 'Updated first name (optional)',
        example: 'Giuseppe',
    }),
    lastName: z.string().min(1).optional().meta({
        description: 'Updated last name (optional)',
        example: 'Verdi',
    }),
});

export const UserPaginationSchema = z.object({
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
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

// response schemas
export const UsersListSchema = z.array(
    z.object({
        id: z.string().meta({
            description: 'Unique identifier of the user',
            example: 'd241582c-6a77-4004-ad7e-954ce2e8e0e1',
        }),
        email: z.email().meta({
            description: 'Email address of the user',
            example: 'user@example.com',
        }),
        firstName: z.string().meta({
            description: 'First name',
            example: 'Mario',
        }),
        lastName: z.string().meta({
            description: 'Last name',
            example: 'Rossi',
        }),
        createdAt: z.date().meta({
            description: 'When the user was created',
            example: '2025-09-13T12:00:00Z',
        }),
        updatedAt: z.date().meta({
            description: 'When the user was last updated',
            example: '2025-09-13T13:00:00Z',
        }),
    })
);

export const UserSchema = z.object({
    id: z.string().meta({
        description: 'Unique identifier of the user',
        example: 'd241582c-6a77-4004-ad7e-954ce2e8e0e1',
    }),
    email: z.email().meta({
        description: 'Email address of the user',
        example: 'user@example.com',
    }),
    firstName: z.string().meta({
        description: 'First name',
        example: 'Mario',
    }),
    lastName: z.string().meta({
        description: 'Last name',
        example: 'Rossi',
    }),
    createdAt: z.date().meta({
        description: 'When the user was created',
        example: '2025-09-13T12:00:00Z',
    }),
    updatedAt: z.date().meta({
        description: 'When the user was last updated',
        example: '2025-09-13T13:00:00Z',
    }),
});

export const UsersPaginatedResponseSchema = z.object({
    total: z.number().meta({
        description: 'Total number of users available',
        example: 50,
    }),
    data: UsersListSchema.meta({
        description: 'List of users for the requested page',
    }),
    skip: z.number().meta({
        description: 'Number of users skipped (offset)',
        example: 0,
    }),
    take: z.number().meta({
        description: 'Maximum number of users returned',
        example: 10,
    }),
});

// types
export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
export type UserDTO = z.infer<typeof UserSchema>;
export type UsersListDTO = z.infer<typeof UsersListSchema>;
export type UserPaginationDTO = z.infer<typeof UserPaginationSchema>;
export type UserPaginatedResponseDTO = z.infer<
    typeof UsersPaginatedResponseSchema
>;
