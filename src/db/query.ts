import db from '.';

const sql = (baseString: TemplateStringsArray, ...params: any[]) =>
  db.run(baseString.join('?'), params);

export default sql;
