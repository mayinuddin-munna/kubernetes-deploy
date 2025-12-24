import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import Users from '../modules/user/user.model';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(httpStatus.UNAUTHORIZED, 'Not authorized, no token'),
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const user = await Users.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'User not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new AppError(httpStatus.UNAUTHORIZED, 'Not authorized, token failed'),
    );
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next(new AppError(httpStatus.FORBIDDEN, 'Not authorized as an admin'));
  }
};
