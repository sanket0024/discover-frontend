import {
  FIND_ALL_USERS,
  CREATE_USER,
  SIGNIN,
  CURRENT_USER,
  SIGNOUT,
  UPDATE_USER,
  FIND_USER_BY_ID,
  SEARCH_USER
} from "../util/constants";

const userInitialState = {
  users: [],
  user: {},
  loggedInUser: {}
};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return state = { ...state, user: action.payload, loggedInUser: action.payload }

    case FIND_ALL_USERS:
      console.log(FIND_ALL_USERS);
      console.log(action.payload);
      var newState = {
        users: action.payload,
        user: state.user,
        loggedInUser: state.loggedInUser
      };
      console.log(newState);
      return newState;

    case CREATE_USER:
      return state = { ...state, user: action.payload, loggedInUser: action.payload }

    case SIGNIN:
      return { ...state, user: action.payload, loggedInUser: action.payload }

    case SIGNOUT:
      return state = { ...userInitialState }

    case UPDATE_USER:
      return state = { ...state, user: action.payload, loggedInUser: action.payload }

    case FIND_USER_BY_ID:
      return { ...state, user: action.payload, loggedInUser: action.payload }

    case SEARCH_USER:
      return state = { ...state, users: action.payload }

    default:
      return state;
  }
}

export default userReducer;
