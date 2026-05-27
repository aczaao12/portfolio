import mysql from "mysql2/promise";

const pool = mysql.createPool({
  uri: process.env.TIDB_DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 5,
  maxIdle: 5,
  idleTimeout: 60000,
});

export async function query(sql: string, params?: any[]) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default pool;
