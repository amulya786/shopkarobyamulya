import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOAD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_CLIENT_USER_REQUEST,
    UPDATE_CLIENT_USER_SUCCESS,
    UPDATE_CLIENT_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants"

import axios from "axios"

//when user login 
export const login = (email = "", password = "") => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}

//when user register on the app 
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } }; // yaha par content-type me multipart form data h kyu ki hum image bhi upload karwa rahe h

        const { data } = await axios.post(
            `/api/v1/register`,
            userData,
            config
        );
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}


//loading user to check if the user token is present or not if true then login user directly
export const loadUser = () => async (dispatch) => { // hum isko app.js me use kare taki jaise hi koi site load ho turant hi pata chal jae token valid h ya nahi
    try {
        dispatch({ type: LOAD_REQUEST });
        const { data } = await axios.get(`/api/v1/me`);
        dispatch({ type: LOAD_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_FAIL, payload: error.response.data.message });
    }
}

//Logout the user 
export const logout = () => async (dispatch) => {
    try {
        // dispatch({ type: LOGOUT_REQUEST });
        await axios.get('/api/v1/logout');
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

//Updating user profile by user
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } }; // yaha par content-type me multipart form data h kyu ki hum image bhi upload karwa rahe h

        const { data } = await axios.put(
            `/api/v1/me/update`,
            userData,
            config
        );
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
}

//Updating user password by user logged in
export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }; // yaha par content-type me multipart form data h kyu ki hum image bhi upload karwa rahe h

        const { data } = await axios.put(
            `/api/v1/password/update`,
            password,
            config
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
}

//Forget password by user 
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }; // yaha par content-type me multipart form data h kyu ki hum image bhi upload karwa rahe h

        const { data } = await axios.post(
            `/api/v1/password/forget`,
            email,
            config
        );
        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.response.data.message });
    }
}
//Reset password by user 
export const resetPassword = (token,passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }; // yaha par content-type me multipart form data h kyu ki hum image bhi upload karwa rahe h

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
}

//getAllUsers by admin 
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USER_REQUEST });
        const {data} = await axios.get('/api/v1//admin/users');
        dispatch({ type: ALL_USER_SUCCESS,payload:data.users });
    } catch (error) {
        dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
    }
}

//get Users details by admin 
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const {data} = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch({ type: USER_DETAILS_SUCCESS,payload:data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

//Updating user by admin
export const updateUser = (id,userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CLIENT_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }; // yaha par content-type me multipart form data h kyu ki hum image bhi upload karwa rahe h

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );
        dispatch({ type: UPDATE_CLIENT_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_CLIENT_USER_FAIL, payload: error.response.data.message });
    }
}

//deleting user by admin
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(
            `/api/v1/admin/user/${id}`  
        );
        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};