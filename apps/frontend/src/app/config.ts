// export const BACKEND_URL = "http://localhost:3001";
// export const HOOKS_URL = "http://localhost:3002";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
export const HOOKS_URL = process.env.NEXT_PUBLIC_HOOKS_URL as string;
