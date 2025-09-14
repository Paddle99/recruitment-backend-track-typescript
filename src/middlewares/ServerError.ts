import type { Request, Response, NextFunction } from "express";

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Server error";
  res.status(status).json({ error: message });
};

