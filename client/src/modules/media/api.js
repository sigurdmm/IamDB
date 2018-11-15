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

export const fetchActorById = id => query(`
  query($id: String!) {
    getActor(id: $id) {
      id
      name
      media {
        id
        name
        thumbnails {
          small
        }
      }
      thumbnails {
        small
      }
      popularity
    }
  }
`, { id });

export const searchMediaByQuery = (queryString, type, limit, offset, sort = {}) => query(`
  query($query: String!, $limit: Int = 50, $offset: Int = 0, $sortOn: String = "rating", $sortDirection: Int = 1, $type: String = null) {
    searchMedia(query: $query, limit: $limit, offset: $offset, sortOn: $sortOn, sortDirection: $sortDirection, type: $type) {
      total
      results {
        id
        name
        rating
        released
        thumbnails {
          small
        }
      }
    }
  }
`, {
  type,
  limit,
  offset,
  query: queryString,
  sortOn: sort.field || null,
  sortDirection: sort.direction || 1,
});
