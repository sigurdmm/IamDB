import qs from 'query-string';

const apiHost = '/graphql';

/**
 * Builds the literal query in GraphQL,
 * and prints any debuggable values to the user
 * */
const createGraphQlQuery = (query, variables) => {
  console.info(`Query: ${query}`);
  console.info(`Variables: ${JSON.stringify(variables)}`);
  return qs.stringify({ query, variables: JSON.stringify(variables) });
};

/**
 * Catches any HTTP errors thrown from the server,
 * and converts it to a more manageable format for the caller
 * */
const errorHandler = async (res) => {
  if (res.status < 300) {
    return res;
  }

  const err = new Error(`Request error: ${res.status}`);
  err.status = res.status;
  err.text = res.statusText;

  throw err;
};

/**
 * Parses the response and analyses the response body
 * for any eventual in-body errors.
 * */
const successHandler = async (res) => {
  const data = await res.json();

  if (data.errors && data.errors.length > 0) {
    const err = new Error('Data response error');
    err.status = res.status;
    err.text = data.errors.map(error => error.message).join(', ');

    throw err;
  }

  return data;
};

export const callGet = (url) => {
  console.info(`GET: ${url}`);

  return fetch(url, { credentials: 'same-origin' })
    .then(errorHandler)
    .then(successHandler)
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
