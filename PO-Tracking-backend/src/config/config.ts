import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/po-tracking';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "rohanchatterjee866@gmail.com";
export const ADMIN_USER = process.env.ADMIN_USER || "admin";
export const ADMIN_PASS = process.env.ADMIN_PASS || "admin";
export const EXPIRE_TIME = process.env.EXPIRE_TIME || "24h";
export const SECRET_KEY = process.env.SECRET_KEY || "po-tracking";