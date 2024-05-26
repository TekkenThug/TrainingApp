import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  public statusCode: number;

  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true, stack = "") {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const catchAsync =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => T) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
