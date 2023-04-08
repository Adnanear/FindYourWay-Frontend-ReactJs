import dotenv from 'dotenv';
dotenv.config();

export const dotEnv = {
  get: (varName: string, fallback: string) => process.env[varName] ?? fallback,
  set: (varName: string, value: string | number | boolean | undefined | null) => {
    process.env[varName] = String(value);
  },
};
