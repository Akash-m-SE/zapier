import jwt from "jsonwebtoken";

interface TokenPayLoad {
  id: number;
  name?: string;
  email?: string;
}

const generateAccessToken = (user: TokenPayLoad) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.name,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
  });
};

const generateRefreshToken = (user: TokenPayLoad) => {
  const payload = {
    id: user.id,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
  });
};

export { generateAccessToken, generateRefreshToken };
