import {combineReducers} from 'redux'
import testTimeReducer from './testTime_redux/testTimeReducer'
import punctuationTypeReducer from './testTime_redux/punctuationTypeReducer';
import speedGraphReducer from './speedAndGraph_redux/speedGraphReducer';
import authReducer from './auth_redux/authReducer';

const rootReducer = combineReducers({
    testTime: testTimeReducer,
    punctuationType: punctuationTypeReducer, 
    speedGraph : speedGraphReducer, 
    auth : authReducer
})

export default rootReducer;