import jwt from 'jsonwebtoken';
import config from '../../config';

const generateToken = (user: { id: string; role: string }) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    config.jwt_access_secret as string,
    {
      expiresIn: '30d',
    }
  );
};

export default generateToken;
