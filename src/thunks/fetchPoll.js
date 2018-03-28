import Request from 'superagent';
import { is_loading, load_poll } from '../actions/index';
import { ROOT_URL } from '../actions/action-types';

const fetchPoll = (id) => dispatch => {
  console.log(id);
  const poll_id = id.substring(6);
  dispatch(is_loading(true));
  return Request.get(`${ROOT_URL}/api/fetchPoll`)
    .query({ id: poll_id })
    .then(res => {
      dispatch(is_loading(false));
      if(res.status === 200){
        console.log('Success');
        console.log(res.body);
        dispatch(load_poll(res.body.poll));
        return ({ success: true });
      }else {
        console.log('Something went horribly wrong');
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export default fetchPoll;