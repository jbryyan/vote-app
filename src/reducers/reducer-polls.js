import { 
  FETCH_POLLS, FETCH_MY_POLLS, LOAD_POLLS, LOAD_MYSORTED_POLLS,
  IS_LOADING
} from '../actions/action-types';

const initialState = {
  allPolls: [],
  sortedPolls: [],
  myPolls: [],
  mySortedPolls: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_POLLS:
      return { ...initialState, myPolls: action.payload }
    case LOAD_MYSORTED_POLLS:
      return { ...state, mySortedPolls: action.payload }
    case FETCH_POLLS:
      return state;
    case FETCH_MY_POLLS:
      return state;
    case IS_LOADING:
      return {...state, loading: action.payload };
    default: 
      return state;
  }
}