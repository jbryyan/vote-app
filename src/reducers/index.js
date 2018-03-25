import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './reducer-user';
import PollsReducer from './reducer-polls';

const rootReducer = combineReducers({
  form: formReducer,
  user: UserReducer,
  polls: PollsReducer
});

export default rootReducer;