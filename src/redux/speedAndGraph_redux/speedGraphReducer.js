import { speedGraphType } from "./speedGraphType";
import { speedGraphAction } from "./speedGraphAction";

const speedGraphReducer = (state = speedGraphAction, action) =>{
    switch (action.type){
        case speedGraphType:
            return{
                ...state,
                speed : action.payload.speed,
                testTime : action.payload.testTime,
                speedArray : action.payload.speedArray
            }
        
        default:
            return state;
    }
}

export default speedGraphReducer;