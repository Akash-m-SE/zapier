import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@repo/http-status";

export enum tokenType {
  AccessToken,
  RefreshToken,
}

export const tokenVerifier = (token: string, type: tokenType) => {
  try {
    const secret =
      type === tokenType.AccessToken
        ? (process.env.ACCESS_TOKEN_SECRET as string)
        : (process.env.REFRESH_TOKEN_SECRET as string);

    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    console.log("Error while verifying token = ", error);

    if (error instanceof TokenExpiredError) {
      if (type === tokenType.AccessToken) {
        throw new ApiError(
          HTTP_STATUS_CODES.EXPIRED_ACCESS_TOKEN,
          HTTP_STATUS_MESSAGES.EXPIRED_ACCESS_TOKEN,
        );
      }

      if (type === tokenType.RefreshToken) {
        throw new ApiError(
          HTTP_STATUS_CODES.EXPIRED_REFRESH_TOKEN,
          HTTP_STATUS_MESSAGES.EXPIRED_REFRESH_TOKEN,
        );
      }
    } else if (error instanceof JsonWebTokenError) {
      if (type === tokenType.AccessToken) {
        throw new ApiError(
          HTTP_STATUS_CODES.INVALID_ACCESS_TOKEN,
          HTTP_STATUS_MESSAGES.INVALID_ACCESS_TOKEN,
        );
      }

      if (type === tokenType.RefreshToken) {
        throw new ApiError(
          HTTP_STATUS_CODES.INVALID_REFRESH_TOKEN,
          HTTP_STATUS_MESSAGES.INVALID_REFRESH_TOKEN,
        );
      }
    } else {
      throw new ApiError(
        500,
        "An unexpected error occurred while validating token.",
      );
    }
  }
};
