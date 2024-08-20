import { punctuationType } from "./punctuationType"
import { punctuationTypeAction } from "./punctuationTypeAction"

const punctuationTypeReducer = (state = punctuationTypeAction, action) => {
    switch (action.type) {
        case punctuationType:
            return {
                ...state,
                punctuation: action.payload.punctuation
            }
        default:
            return state
    }
}

export default punctuationTypeReducer