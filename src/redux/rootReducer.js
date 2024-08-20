import {combineReducers} from 'redux'
import testTimeReducer from './testTime_redux/testTimeReducer'
import punctuationTypeReducer from './testTime_redux/punctuationTypeReducer';
import speedGraphReducer from './speedAndGraph_redux/speedGraphReducer';

const rootReducer = combineReducers({
    testTime: testTimeReducer,
    punctuationType: punctuationTypeReducer, 
    speedGraph : speedGraphReducer
})

export default rootReducer;