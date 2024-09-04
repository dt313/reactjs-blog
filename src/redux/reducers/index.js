import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import toastReducer from './toastReducer';
import commentReducer from './commentReducer';
import shareBoxReducer from './shareBoxReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    toast: toastReducer,
    comment: commentReducer,
    shareBox: shareBoxReducer,
});

export default rootReducer;
