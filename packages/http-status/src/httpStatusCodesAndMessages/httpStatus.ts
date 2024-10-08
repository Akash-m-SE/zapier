export const HTTP_STATUS_CODES = {
  INVALID_ACCESS_TOKEN: 498,
  EXPIRED_ACCESS_TOKEN: 440,
  ACCESS_TOKEN_NOT_FOUND: 401,

  INVALID_REFRESH_TOKEN: 499,
  EXPIRED_REFRESH_TOKEN: 441,
  REFRESH_TOKEN_NOT_FOUND: 442,
};

export const HTTP_STATUS_MESSAGES = {
  INVALID_ACCESS_TOKEN: "Invalid Access Token. Please login again.",
  EXPIRED_ACCESS_TOKEN: "Expired Access Token.",
  ACCESS_TOKEN_NOT_FOUND: "Access Token not found. Please login again.",

  INVALID_REFRESH_TOKEN: "Invalid Refresh Token. Please login again.",
  EXPIRED_REFRESH_TOKEN: "Expired Refresh Token. Please login again.",
  REFRESH_TOKEN_NOT_FOUND: "Refresh Token not found. Please login again.",
};
