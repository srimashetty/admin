import {Pool} from "pg";
import credentials from "./credentials";
  
const pool = new Pool({
    user: credentials.username,
    database: credentials.database,
    password: credentials.password,
    host: credentials.server, 
    port: 5432,  
    idleTimeoutMillis: 30000,
});

export default pool;