import { combineReducers } from 'redux';
import UserState from './userGlobal';

export default combineReducers({
    user: UserState
})