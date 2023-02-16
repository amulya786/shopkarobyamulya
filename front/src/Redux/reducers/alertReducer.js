import { ALERT_STATUS } from "../constants/alertConstant";

export const alertReducer = (state = {}, action) => {
    switch (action.type){
        case ALERT_STATUS:
            return{
                ...state,
                status:action.payload,
           }
        default:
           return state;
    }

}