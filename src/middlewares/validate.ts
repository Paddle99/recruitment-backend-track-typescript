/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { ZodType } from 'zod';

export enum REQUEST_INPUT_TYPES {
    BODY = 'body',
    PARAMS = 'params',
    QUERY = 'query',
}

export const validate =
    <T>(
        schema: ZodType<T>,
        type: REQUEST_INPUT_TYPES = REQUEST_INPUT_TYPES.BODY
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        const parseResult = schema.safeParse(req[type]);

        if (!parseResult.success) {
            return res
                .status(400)
                .json({ errors: z.treeifyError(parseResult.error) });
        }

        switch (type) {
            case REQUEST_INPUT_TYPES.BODY:
                (req as any).validatedBody = parseResult.data;
                break;
            case REQUEST_INPUT_TYPES.PARAMS:
                (req as any).validatedParams = parseResult.data;
                break;
            case REQUEST_INPUT_TYPES.QUERY:
                (req as any).validatedQuery = parseResult.data;
                break;
        }

        next();
    };
