import axios from "axios";
import { ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO } from "../constants/cartConstant";


//add items to the user cart
export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
    try {
        // const data= await axios.get(`/api/v1/product/${id}`);
        const {data}= await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: ADD_TO_CART,
            payload: { // ye sara data fetch karna h humko 
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            }
        });

    } catch (e) {
        dispatch({ type: "Error Add TO CART"})
    }
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)) // confusion in this line of code 
}

//remove items from the user cart
export const removeItemsToCart = (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id, // ye sara data fetch karna h humko 
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)) // confusion in this line of code 
    } catch (e) {
        dispatch({ type: "Error Remove TO CART"})
    }
}

//save shipping info
export const saveShippingInfo = (data) => async (dispatch,getState) => {
    try {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data, // ye sara data fetch karna h humko 
        });

        localStorage.setItem("shippingInfo", JSON.stringify(data)) // confusion in this line of code 
    } catch (e) {
        dispatch({ type: "Shipping Info savnig error"})
    }
}