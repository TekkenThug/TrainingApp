import { Request, Response, NextFunction } from "express";
import status from "statuses";
import config from "@/configs/config";
import logger from "@/configs/logger";
import { ApiError } from "@/utils/errors";

export const errorConverter = (
  err: (Error & { statusCode?: number }) | ApiError,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? status("Bad request") : status("Internal server error");
    const message = error.message || status(statusCode);
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

export const errorHandler = (err: ApiError, _: Request, res: Response, _next: NextFunction) => {
  let { statusCode, message } = err;
  if (config.env === "prod" && !err.isOperational) {
    statusCode = status("Internal server error");
    message = status(status("Internal server error"));
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "dev" && { stack: err.stack }),
  };

  if (config.env === "dev") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
