import { testTimeType } from "./testTimeType";
import { testTimeAction } from "./testTimeAction";

const testTimeReducer = (state = testTimeAction, action) => {
    switch (action.type){
        case testTimeType:
            return {
                ...state, 
                time : action.payload.time
            }
        default:
            return state
    }
}

export default testTimeReducer;