import Request from 'superagent';
import { is_loading, login_user } from '../actions/index';
import { ROOT_URL } from '../actions/action-types';

const login = (user) => (dispatch) => {
  
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

export default login;