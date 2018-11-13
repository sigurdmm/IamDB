import { query } from '../../utils/api';

/**
 *
 * */
// eslint-disable-next-line import/prefer-default-export
// export const fetchMediaById = id => fetch(`/api/v1/media/${id}`, { credentials: 'same-origin' })
//   .then(res => res.json());

// eslint-disable-next-line import/prefer-default-export
export const fetchMediaById = id => query(`
  query($id: String!) {
    media(id: $id) {
      id
      name
      description
      imdbid
      rating
      type
      released
      actors {
        id
        name
        thumbnails {
          small
        }
      }
      director
      thumbnails {
        small
        large
      }
    }
  }
`, { id });

export const searchMediaByQuery = (queryString, type, limit, offset) => query(`
  query($query: String!, $limit: Int = 50, $offset: Int = 0) {
    searchMedia(query: $query, limit: $limit, offset: $offset) {
      id
      name
      rating
      type
      thumbnails {
        small
      }
    }
  }
`, {
  type,
  limit,
  offset,
  query: queryString,
});
