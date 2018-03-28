import Request from 'superagent';
import { is_loading, login_user, logout } from '../actions/index';
import { ROOT_URL } from '../actions/action-types';

const authToken = () => dispatch => {

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

export default authToken;