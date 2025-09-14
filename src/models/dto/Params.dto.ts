import { z } from 'zod';

export const IdParamSchema = z.object({
    id: z.string(),
});

export const EmailParamSchema = z.object({
    email: z.email(),
});

export type IdParamDTO = z.infer<typeof IdParamSchema>;
export type EmailParamDTO = z.infer<typeof EmailParamSchema>;
