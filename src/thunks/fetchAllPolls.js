import Request from 'superagent';
import { is_loading, my_polls } from '../actions/index';
import { ROOT_URL } from '../actions/action-types';

const fetchAllPolls = () => dispatch => {
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

export default fetchAllPolls;