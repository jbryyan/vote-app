import { 
  LOGIN_USER, LOGOUT_USER, 
  ROOT_URL, LOADING_USER, FETCH_MY_POLLS,
  LOAD_POLLS, LOAD_MYSORTED_POLLS, IS_LOADING
} from './action-types';

import Request from 'superagent';

const login_user = (username) => {
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

export function loadingUser(loading) {
  return {
    type: LOADING_USER,
    payload: loading
  }
}

const my_polls = (polls, sort) => {
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

//----------------------
//Thunk functions
export const register = (user) => (dispatch) => {
  return Request.post(`${ROOT_URL}/api/register`)
    .set('Authorization', '')
    .send(user)
    .then((res) => {
      console.log(res.header);
      localStorage.setItem('pinCloneToken', res.header.authorization);
      dispatch(login_user({ username: res.body.username, loggedIn: true, loginPage: true }));
      return ({ success: true })
    })
    .catch(error => {
      console.log(error);
      const errorMessage = error.response.body.message;
      return ({ success: false, message: { username: errorMessage, _error: 'Registration failed' }})
    });
}

export const login = (user) => (dispatch) => {
  
  return Request.post(`${ROOT_URL}/api/login`)
    .send(user)
    .then((res) => {
      console.log(res.header);
      localStorage.setItem('pinCloneToken', res.header.authorization);
      dispatch(login_user({ username: res.body.username, loggedIn: true, loginPage: true }));
      return ({ success: true });
    })
    .catch(error => {
      console.log(error);
      const errorMessage = error.response.body.message;
      return ({ success: false, message: { _error:  errorMessage } });
    })
}

export const authtoken = () => dispatch => {

  //return Request.get(`${ROOT_URL}/tokenAuth`)
  return Request.get(`${ROOT_URL}/api/authtoken`)
    .set('Authorization', localStorage.getItem('pinCloneToken'))
    .then(res => {
      if (res.status === 200) {
        console.log(res.body);
        const username = res.body.username;
        dispatch(login_user( { username: username, loggedIn: true, loginPage: true }));
      }
      else {
        throw (new Error('Something went horibly wrong!'));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(logout());
    });
}

export const addNewPoll = (values) => dispatch => {
  dispatch(is_loading(true));
  return Request.post(`${ROOT_URL}/api/addNewPoll`)
    .set('Authorization', localStorage.getItem('pinCloneToken'))
    .send(values)
    .then(res => {
      dispatch(is_loading(false));
      console.log(res.body);
      if (res.status === 200) {
        dispatch(fetchMyPolls());
        return ({ success: true });
      } else {
        return ({ success: false });
      }
    })
    .catch(error => {
      console.log(error);
      return ({ success: false });
    });
}

export const fetchAllPolls = () => dispatch => {
  Request.get(`${ROOT_URL}/api/fetchAllPolls`)
    .set('Authorization', localStorage.getItem('pinCloneToken'))
    .then(res => {
      if(res.status === 200){
        //Update state
        console.log(res.body);
        dispatch(my_polls(res.body.myPolls, true))
        //dispatch(mysorted_polls(res.body.myPolls));
      }else {
        //success failed
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export const fetchMyPolls = (values) => dispatch => {
  Request.get(`${ROOT_URL}/api/fetchMyPolls`)
    .set('Authorization', localStorage.getItem('pinCloneToken'))
    .then(res => {
      if(res.status === 200){
        //Update state
        console.log(res.body);
        dispatch(my_polls(res.body.myPolls, true))
        //dispatch(mysorted_polls(res.body.myPolls));
      }else {
        //success failed
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export const sortMyPolls = (value, sort, polls, sortedPolls) => dispatch => {
  console.log(value, polls, sortedPolls);
  
  if(value === '') {
    //this.setState({ sortedData: [] });
    let sorted = [];
    dispatch(my_sortedpolls(sorted));
  } else if( (value === 'recent' || value === 'popular') && value !== sort && sortedPolls.length == 0) {

    if (value === 'recent') {
      polls.sort( (a, b) => new Date(b.date) - new Date(a.date) );
      dispatch(my_polls(polls));
    } else {
      polls.sort( (a, b) => b.votes - a.votes );
      dispatch(my_polls(polls));
    }
  } else if((value === 'recent' || value === 'popular') && value !== sort){

    if (value === 'recent') {
      sortedPolls.sort( (a, b) => new Date(b.date) - new Date(a.date) );
      polls.sort( (a, b) => new Date(b.date) - new Date(a.date) );
      dispatch(my_polls(polls));
      dispatch(my_sortedpolls(sortedPolls));
    } else {
      sortedPolls.sort( (a, b) => b.votes - a.votes );
      polls.sort( (a, b) => b.votes - a.votes );
      dispatch(my_polls(polls));
      dispatch(my_sortedpolls(sortedPolls));
    }
  }
  else{
    var newArray = polls.filter(item => {
      return (item.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    });
    dispatch(my_sortedpolls(newArray));
  }
  
}

export const deleteMyPoll = (poll) => dispatch => {
  console.log(poll);
  dispatch(is_loading(true));
  return Request.delete(`${ROOT_URL}/api/deletePoll`)
  .set('Authorization', localStorage.getItem('pinCloneToken'))
  .query({ id: poll })
  .then(res => {
    dispatch(is_loading(false));
    if(res.status === 200){
      dispatch(fetchMyPolls());
      return({ success: true });
    }else{
      throw (new Error('Something went horibly wrong!'));
    }
  })
  .catch(err => {
    console.log(err);
  })
}

export const voteForPoll = (id, option) => dispatch => {
  dispatch(is_loading(true));
  return Request.put(`${ROOT_URL}/api/voteForPoll`)
    .set('Authorization', localStorage.getItem('pinCloneToken'))
    .send({ id: id, option: option })
    .then(res => {
      if(res.status === 200){
        return ({ success: true });
      }else{
        throw (new Error('Something went horribly wrong!'));
      }
    })
    .catch(err => {
      console.log(err);
    })
}