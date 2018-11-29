import { ADD_POST, GET_POSTS, POST_LOADING } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    default:
      return state;
  }
}
