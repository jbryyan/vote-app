import { 
  LOGIN_USER, LOGOUT_USER, 
  ROOT_URL, LOADING_USER, FETCH_MY_POLLS,
  LOAD_POLLS, LOAD_MYSORTED_POLLS, IS_LOADING,
  LOAD_POLL
} from './action-types';

export const login_user = (username) => {
  return {
    type: LOGIN_USER,
    payload: username
  };
}

export const logout = () => {
  localStorage.removeItem('pinCloneToken');
  return {
    type: LOGOUT_USER,
  }
}

export const loadingUser = (loading) => {
  return {
    type: LOADING_USER,
    payload: loading
  }
}

export const my_polls = (polls, sort) => {
  if(sort) polls.sort( (a, b) => b.totalVotes - a.totalVotes );
 
  return{
    type: LOAD_POLLS,
    payload: polls
  };
}

export const my_sortedpolls = (value) => {
  console.log(value);

  return {
    type: LOAD_MYSORTED_POLLS,
    payload: value
  };
}

export const is_loading = (value) => {
  return {
    type: IS_LOADING,
    payload: value
  };
}

export const load_poll = (value) => {
  return {
    type: LOAD_POLL,
    payload: value
  };
}











