import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';

const generatedAccessToken = async (userId: Types.ObjectId): Promise<string> => {
  const token = jwt.sign(
    { id: userId.toString() },
    process.env.SECRET_KEY_ACCESS_TOKEN as string,
    { expiresIn: '5h' }
  );

  return token;
};

export default generatedAccessToken;
