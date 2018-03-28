import Request from 'superagent';
import { is_loading } from '../actions/index';
import { ROOT_URL } from '../actions/action-types';

const voteForPoll = (id, option) => dispatch => {
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

export default voteForPoll;