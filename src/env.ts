import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3333),
  TZ: z.string().default('America/Sao_Paulo'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
  console.error('Invalid environment variables', parsedEnv.error.format());

  throw new Error('Invalid environment variables');
}

const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));

export const env = { ...parsedEnv.data, DIR_NAME };
