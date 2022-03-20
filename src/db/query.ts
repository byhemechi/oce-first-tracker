import { RunResult } from 'sqlite3';
import db from '.';

const sql = <T>(baseString: TemplateStringsArray, ...params: any[]) =>
  new Promise<T[] | null>((resolve, reject) => {
    db.all(
      baseString.join('?'),
      ...params,
      (error: Error | null, rows: T[] | null) => {
        error ? reject(error) : resolve(rows);
      }
    );
  });
export default sql;
