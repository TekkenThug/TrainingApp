import passport from "passport";
import { NextFunction, Request, Response } from "express";
import status from "statuses";
import { ApiError } from "@/utils/errors.ts";

const verifyCallback = (req: Request, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(status("Unauthorized"), 'Please authenticate'));
  }

  req.user = user;

  resolve();
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        {
          session: false
        },
        verifyCallback(req, resolve, reject)
      )(req, res, next);
    });
    return next();
  } catch (err) {
    return next(err);
  }
}
