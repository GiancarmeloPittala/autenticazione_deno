import {  Database } from 'https://deno.land/x/denodb/mod.ts';

const { DB_DATABASE_NAME,
        DB_HOST,
        DB_USERNAME,
        DB_PASSWORD,
        DB_PORT } = Deno.env.toObject();

export const db = new Database('mysql', {
  database: 'my-database',
  host: 'url-to-db.com',
  username: 'username',
  password: 'password',
  port: 3306, // optional
})