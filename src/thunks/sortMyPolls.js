import Request from 'superagent';
import { is_loading, my_sortedpolls, my_polls } from '../actions/index';
import { ROOT_URL } from '../actions/action-types';

const sortMyPolls = (value, sort, polls, sortedPolls) => dispatch => {
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
      console.log('Popular');
      polls.sort( (a, b) => b.totalVotes - a.totalVotes );
      console.log(polls);
      dispatch(my_polls(polls));
    }
  } else if((value === 'recent' || value === 'popular') && value !== sort){

    if (value === 'recent') {
      sortedPolls.sort( (a, b) => new Date(b.date) - new Date(a.date) );
      polls.sort( (a, b) => new Date(b.date) - new Date(a.date) );
      dispatch(my_polls(polls));
      dispatch(my_sortedpolls(sortedPolls));
    } else {
      sortedPolls.sort( (a, b) => b.totalVotes - a.totalVotes );
      polls.sort( (a, b) => b.totalVotes - a.totalVotes );
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

export default sortMyPolls;
