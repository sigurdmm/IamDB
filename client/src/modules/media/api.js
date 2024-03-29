import { mutate, query } from '../../utils/api';

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
      comments {
        createdAt
        text
      }
    }
  }
`, { id });

export const searchMediaByQuery = (queryString, type, limit, offset, sortField, sortDirection) => query(`
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
  sortOn: sortField || null,
  sortDirection: sortDirection || 1,
});

export const addCommentToMedia = (id, comment) => mutate(`
  mutation($id: String!, $comment: String!) {
    addComment(id: $id, comment: $comment) {
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
      comments {
        createdAt
        text
      }
    }
  }
`, { id, comment });
