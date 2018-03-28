import Request from 'superagent';
import { is_loading } from '../actions/index';
import fetchMyPolls from './fetchMyPolls';
import { ROOT_URL } from '../actions/action-types';

const addNewPoll = (values) => dispatch => {
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

export default addNewPoll;