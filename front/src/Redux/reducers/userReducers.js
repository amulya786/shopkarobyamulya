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
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    UPDATE_CLIENT_USER_REQUEST,
    UPDATE_CLIENT_USER_SUCCESS,
    UPDATE_CLIENT_USER_RESET,
    UPDATE_CLIENT_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants"
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        // login aur register ke case dono same h ,iss liye dono ko hi ek me use kar liya but dono ke actions differ h
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        // login aur register ke case dono same h ,iss liye dono ko hi ek me use kar liya but dono ke actions differ h
        case UPDATE_USER_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_CLIENT_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_CLIENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            }
        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_CLIENT_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_CLIENT_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const forgetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        // login aur register ke case dono same h ,iss liye dono ko hi ek me use kar liya but dono ke actions differ h
        case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allUsersReducer = (state = {user:[]}, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {user:[]}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

