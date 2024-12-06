import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: "./db/migrations",
  schema: './db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DB_URL||"",
    authToken: process.env.DB_AUTH_TOKEN||"",
  },
});