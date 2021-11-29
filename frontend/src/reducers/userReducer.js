import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PASSWORD_FAIL,
    USER_PASSWORD_SUCCESS,
    USER_PASSWORD_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,
    USER_PASSWORD_RESET_REQUEST

}
    from "../constants/userConstants";

export const userLoginReducer=(state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true }
        case USER_LOGIN_SUCCESS:
            return{loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:{
            return{loading:false, error:action.payload}
        }
        case USER_LOGOUT:{
            return{}
        }
        default:
            return state
    }
}


export const updateUserReducer=(state={},action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {updateLoading: true }
        case USER_UPDATE_SUCCESS:
            return{updateLoading:false, userProfile:action.payload}
        case USER_UPDATE_FAIL:{
            return{updateLoading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const userProfileReducer=(state={},action)=>{
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return {loading: true }
        case USER_PROFILE_SUCCESS:
            return{loading:false, user:action.payload}
        case USER_PROFILE_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const forgotPasswordReducer=(state={},action)=>{
    switch(action.type){
        case USER_PASSWORD_REQUEST:
            return {loading: true }
        case USER_PASSWORD_SUCCESS:
            return{loading:false, status:action.payload}
        case USER_PASSWORD_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const resetPasswordReducer=(state={},action)=>{
    switch(action.type){
        case USER_PASSWORD_RESET_REQUEST:
            return {loading: true }
        case USER_PASSWORD_RESET_SUCCESS:
            return{loading:false, status:action.payload}
        case USER_PASSWORD_RESET_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}
