const queryBuilder = (queryObject: { [key: string]: any }) =>
  new URLSearchParams(Object.entries(queryObject));

export default queryBuilder;
