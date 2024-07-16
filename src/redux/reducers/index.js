import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import toastReducer from './toastReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    toast: toastReducer,
    comment: commentReducer,
});

export default rootReducer;
