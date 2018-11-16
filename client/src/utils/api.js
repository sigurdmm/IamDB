import qs from 'query-string';

const apiHost = '/graphql';

/**
 * Builds the literal query in GraphQL,
 * and prints any debuggable values to the user
 * */
const createGraphQlQuery = (query, variables) => qs
  .stringify({ query, variables: JSON.stringify(variables) });

/**
 * Catches any HTTP errors thrown from the server,
 * and converts it to a more manageable format for the caller
 * */
const errorHandler = async (res) => {
  if (res.status < 300) {
    return res;
  }

  // Attempt to fetch json data
  // from the response
  let data = null;
  try {
    data = await res.json();
  } catch (formatErr) {
    // Do nothing
  }

  const err = new Error(`Request error: ${res.status}`);
  err.status = res.status;

  // Use the errors from graphql, if they exists
  if (data && data.errors) {
    err.text = data.errors.map(error => error.message).join(', ');
  } else {
    err.text = res.statusText;
  }

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

/**
 * Calls get using fetch,
 * and dispatches the response to
 * errorHandler and/or successHandler
 * @param {string} url Fully built request url
 * @return {Promise}
 * */
export const callGet = url => fetch(url, { credentials: 'same-origin' })
  .then(errorHandler)
  .then(successHandler)
  .then(body => body.data);

/**
 * Handler for query requests.
 * Calls graphql using HTTP GET,
 * which is better suited for non-sensitive requests
 * @param {string} queryStr graphql query as a string
 * @param {object} variables Collection of variables for the query
 */
export const query = async (queryStr, variables = {}) => {
  const graphqlQuery = createGraphQlQuery(queryStr, variables);

  return callGet(`${apiHost}?${graphqlQuery}`);
};

/**
 * Handler for mutation requests.
 * Calls graphql using HTTP POST
 * @param {string} queryStr Graphql mutation as a string
 * @param {object} variables Collection of variables for the mutation
 * @return {Promise}
 * */
export const mutate = async (queryStr, variables = {}) => fetch(
  apiHost,
  {
    method: 'post',
    body: JSON.stringify({
      variables: JSON.stringify(variables),
      query: queryStr,
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    credentials: 'same-origin',
  },
)
  .then(errorHandler)
  .then(successHandler)
  .then(body => body.data);
