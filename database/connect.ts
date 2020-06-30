import { Database } from 'https://deno.land/x/denodb/mod.ts';

const { DB_DATABASE_NAME,
        DB_HOST,
        DB_USERNAME,
        DB_PASSWORD,
        DB_PORT } = Deno.env.toObject();

export const db = new Database({ dialect: 'mysql', debug: false }, {
  database: DB_DATABASE_NAME,
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT)
})