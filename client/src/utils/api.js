import qs from 'query-string';

const apiHost = '/graphql';

const createGraphQlQuery = (query, variables) => {
  console.info(`Query: ${query}`);
  console.info(`Variables: ${JSON.stringify(variables)}`);
  return qs.stringify({ query, variables: JSON.stringify(variables) });
};

const errorHandler = async (res) => {
  if (res.status < 300) {
    return res;
  }

  const err = new Error(`Request error: ${res.status}`);
  err.status = res.status;
  err.text = res.statusText;

  throw err;
};

export const callGet = (url) => {
  console.info(`GET: ${url}`);

  return fetch(url, { credentials: 'same-origin' })
    .then(errorHandler)
    .then(res => res.json())
    .then(body => body.data);
};

export const query = async (queryStr, variables = {}) => {
  const graphqlQuery = createGraphQlQuery(queryStr, variables);

  return callGet(`${apiHost}?${graphqlQuery}`);
};

// Handler for mutations
// export const mutate = async (queryStr, variables = {}) => {
//
// };
