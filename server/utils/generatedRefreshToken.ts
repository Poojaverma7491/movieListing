import UserModel from '../models/user.model.ts';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';

const genertedRefreshToken = async (userId: Types.ObjectId): Promise<string> => {
  const token = jwt.sign(
    { id: userId.toString() },
    process.env.SECRET_KEY_REFRESH_TOKEN as string,
    { expiresIn: '7d' }
  );

  await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return token;
};

export default genertedRefreshToken;
