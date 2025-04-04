import { drizzle } from 'drizzle-orm/neon-http';
import {neon} from '@neondatabase/serverless'
import * as schema from "./schema";
import { env } from "~/env"




const sql = neon(env.POSTGRES_URL);


// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, {schema});



