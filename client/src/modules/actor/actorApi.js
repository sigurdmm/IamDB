import { query } from '../../utils/api';

// eslint-disable-next-line import/prefer-default-export
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
