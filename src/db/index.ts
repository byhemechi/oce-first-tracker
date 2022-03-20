import path from 'path';
import { Database, sqlite3 } from 'sqlite3';

const db: Database = new Database(
  process.env.DB_PATH ?? path.resolve(__dirname, '../../data.db')
);

export default db;
