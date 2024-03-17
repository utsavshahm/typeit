import {combineReducers} from 'redux'
import testTimeReducer from './testTime_redux/testTimeReducer'
import speedGraphReducer from './speedAndGraph_redux/speedGraphReducer';

const rootReducer = combineReducers({
    testTime : testTimeReducer,
    speedGraph : speedGraphReducer
})

export default rootReducer;