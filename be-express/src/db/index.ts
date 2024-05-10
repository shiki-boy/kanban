import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from './schema'

import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from "@config";

export const client = new Client({
  host: POSTGRES_HOST,
  port: 5432,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});

export const db = drizzle(client, {
  schema,
});
