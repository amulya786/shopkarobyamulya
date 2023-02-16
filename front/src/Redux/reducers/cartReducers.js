import { ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type){
        case ADD_TO_CART:
           const item = action.payload;
           const isItemExist = state.cartItems.find(
            (i) => i.product === item.product
           );
           if(isItemExist){ // pahle hum check kar lenge ki cart me koi item h ya nahi 
            return{
                ...state,
                cartItems:state.cartItems.map((i)=>
                i.product === isItemExist.product ? item:i
                )
            }
           }else{
            return{
                ...state,
            cartItems:[...state.cartItems,item]
            };
           }
         case  REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems:state.cartItems.filter((i)=>i.product !== action.payload) // i -> id=product yaha par ye id jo hogi usko filter kar lega
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo : action.payload,
            }
        default:
           return state;
    }

}