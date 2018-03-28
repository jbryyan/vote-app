import Request from 'superagent';
import { is_loading } from '../actions/index';
import fetchMyPolls from './fetchMyPolls';
import { ROOT_URL } from '../actions/action-types';

const deleteMyPoll = (poll) => dispatch => {
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

export default deleteMyPoll;