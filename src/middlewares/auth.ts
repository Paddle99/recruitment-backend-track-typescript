import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded; // eslint-disable-line @typescript-eslint/no-explicit-any
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
