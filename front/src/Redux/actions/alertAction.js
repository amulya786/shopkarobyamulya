import {ALERT_STATUS} from "../constants/alertConstant"

export const alertStatus = (val) => async (dispatch,getState) => {
    try {
        dispatch({
            type: ALERT_STATUS,
            payload:  // ye sara data fetch karna h humko 
                val
        });

    } catch (e) {
        dispatch({ type: "Error Add TO CART"})
    }
}