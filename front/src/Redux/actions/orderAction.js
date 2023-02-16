import {
    CREATE_ORDER_REQUEST,
CREATE_ORDER_SUCCESS,
CREATE_ORDER_FAIL,
CLEAR_ERRORS,
MY_ORDER_REQUEST,
MY_ORDER_SUCCESS,
MY_ORDER_FAIL,
ORDER_DETAILS_REQUEST,
ORDER_DETAILS_SUCCESS,
ORDER_DETAILS_FAIL,
All_ORDER_REQUEST,
All_ORDER_SUCCESS,
All_ORDER_FAIL,
UPDATE_ORDER_REQUEST,
UPDATE_ORDER_SUCCESS,
UPDATE_ORDER_FAIL,
DELETE_ORDER_REQUEST,
DELETE_ORDER_SUCCESS,
DELETE_ORDER_FAIL,
} from "../constants/orderConstant";

import axios from "axios";

//Creating Order
export const createOrder = (order)=> async (dispatch)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST});
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data} = await axios.post("/api/v1/order/new",order,config);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
    }catch(e){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}

// Get My orders Details
export const getOrderDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});
        
        const {data} = await axios.get(`/api/v1//order/${id}`);
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order});
    }catch(e){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:e.response.data.message,
        })
    }
}
//My Orders
export const myOrders = ()=> async (dispatch)=>{
    try{
        dispatch({type:MY_ORDER_REQUEST});
        
        const {data} = await axios.get("/api/v1/orders/me");
        dispatch({type:MY_ORDER_SUCCESS,payload:data.order});
    }catch(e){
        dispatch({
            type:MY_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}
//All orders
export const getAllOrders = ()=> async (dispatch)=>{
    try{
        dispatch({type:All_ORDER_REQUEST});
        
        const {data} = await axios.get("/api/v1/admin/orders");
        dispatch({type:All_ORDER_SUCCESS,payload:data.orders});
    }catch(e){
        dispatch({
            type:All_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}

//update orders
export const updateOrder = (id,order)=> async (dispatch)=>{
    try{
        dispatch({type:UPDATE_ORDER_REQUEST});
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data} = await axios.put(`/api/v1/admin/order/${id}`,order,config);
        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success});
    }catch(e){
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}

//delete orders
export const deleteOrder = (id)=> async (dispatch)=>{
    try{
        dispatch({type:DELETE_ORDER_REQUEST});
       
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success});
    }catch(e){
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}

//clearing errors
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
};