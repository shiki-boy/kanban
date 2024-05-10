import { defineConfig } from "drizzle-kit";
// ! NOTE: currently drizzle studio will run only through local machine and not docker 
// ? found in easier like this ¯\_(ツ)_/¯

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: 'localhost',
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    user: process.env.POSTGRES_USER as string,
    port: 5432
  },
  verbose: true,
  strict: true,
});
