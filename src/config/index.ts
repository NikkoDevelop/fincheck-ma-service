import * as dotenv from 'dotenv';

dotenv.config();

export const SERVER_TYPE = process.env.SERVER_TYPE as string;
export const HASH_COIN = Number(process.env.HASH_COIN) as number;
export const SERVICE_NAME = process.env.SERVICE_NAME as string;
export const SERVER_HOST = process.env.SERVER_HOST as string;
export const SERVER_PORT = Number(process.env.SERVER_PORT) as number;
export const COOKIE_SECRET = process.env.COOKIE_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
