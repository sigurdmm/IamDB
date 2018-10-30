/**
 *
 * */
// eslint-disable-next-line import/prefer-default-export
export const fetchMediaById = id => fetch(`/api/v1/media/${id}`, { credentials: 'same-origin' })
  .then(res => res.json());
