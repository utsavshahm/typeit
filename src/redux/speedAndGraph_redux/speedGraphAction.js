import { speedGraphType } from "./speedGraphType";

const speedGraphAction = {
    type : speedGraphType,
    payload:{
        speed : 0,
        speedArray : [],
        testTime: 0,
        accuracy : 0
    }
}

export {speedGraphAction};