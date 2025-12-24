import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import Users from '../modules/user/user.model';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

interface JwtPayload {
  userId: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as unknown as JwtPayload;
    req.user = await Users.findById(decoded.userId).select('-password');

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'no token, no auth');
  }
};
