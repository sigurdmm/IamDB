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
      actors
      director
      thumbnails {
        small
        large
      }
    }
  }
`, { id });
