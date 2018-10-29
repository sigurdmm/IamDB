export const FETCH_POSTS = 'FETCH_POSTS';
export const NEW_POST = 'NEW_POST';

export const fetchPosts = () => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(payload => dispatch({
      payload,
      type: FETCH_POSTS,
    }));
};
