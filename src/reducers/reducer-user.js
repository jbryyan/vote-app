import { 
  AUTH_USER, LOGIN_USER, 
  REG_SUCCESS, LOGOUT_USER, LOADING_USER, IS_LOADING
} from '../actions/action-types';

const initialState = {
  username: null,
  loggedIn: false,
  loginPage: false,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      const { payload } = action;
      return {...state, 
        username: payload.username, 
        loggedIn: payload.loggedIn, 
        loginPage: payload.loginPage 
      };
    case AUTH_USER:
      return {...state, username: action.payload.username};
    case LOGOUT_USER:
      return initialState;
    case IS_LOADING:
      return {...state, loading: action.payload };
    default: 
      return state;
  }
}