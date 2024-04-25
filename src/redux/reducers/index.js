import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import toastReducer from './toastReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    toast: toastReducer,
});

export default rootReducer;
