import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PASSWORD_SUCCESS,
    USER_PASSWORD_REQUEST,
    USER_PASSWORD_FAIL,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,
    USER_PASSWORD_RESET_REQUEST
} from "../constants/userConstants";
import axios from "axios";

export const userLogin=(email,password,userType,remember)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type:USER_LOGIN_REQUEST
            })

            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }


            if(userType === 'Admin') {
                var {data} = await axios.post('/admin/login',
                    {email, password},
                    config
                )
            }
            else if(userType==='Super Admin')
                var {data} = await axios.post('/superadmin/login',
                    {email, password},
                    config
                )

            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })

            if(remember==true)
                localStorage.setItem("userInfo",JSON.stringify(data))
            else
                sessionStorage.setItem('userInfo',JSON.stringify(data))


        } catch(error){
            dispatch({
                type:USER_LOGIN_FAIL,
                payload:error.response && error.response.data.message ?
                    error.response.data.message :error.message,
            })
        }
    }
}


export const userLogout = () => {
    return async (dispatch)=>{
        dispatch({
            type:USER_LOGOUT
        })
        localStorage.clear()
        sessionStorage.clear()

    }
}

export const updateUser=(id,user,userType)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:USER_UPDATE_REQUEST
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }




            if(userType === 'Admin') {
                var {data} = await axios.patch(`/admin/update/${id}`,
                    user,
                    config
                )
            }
            // else if(userType==='Super Admin')
            //     console.log("super admin")

            dispatch({
                type:USER_UPDATE_SUCCESS,
                payload:data
            })



        } catch(error){
            dispatch({
                type:USER_UPDATE_FAIL,
                payload:error.response && error.response.data.message ?
                    error.response.data.message :error.message,
            })
        }
    }
}

export const userProfile=(id,userType)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:USER_PROFILE_REQUEST
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            if(userType === 'Admin') {
                var {data} = await axios.get(`/admin/profile/:id`,
                    config
                )
            }
            // else if(userType==='Super Admin')
            //     console.log("super admin")

            dispatch({
                type:USER_PROFILE_SUCCESS,
                payload:data
            })



        } catch(error){
            dispatch({
                type:USER_PROFILE_FAIL,
                payload:error.response && error.response.data.message ?
                    error.response.data.message :error.message,
            })
        }
    }
}

export const forgotPassword=(email)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:USER_PASSWORD_REQUEST
            })

                let {data} = await axios.post(`/admin/password`, {email}
                )

            dispatch({
                type:USER_PASSWORD_SUCCESS,
                payload:data
            })



        } catch(error){
            dispatch({
                type:USER_PASSWORD_FAIL,
                payload:error.response && error.response.data.message ?
                    error.response.data.message :error.message,
            })
        }
    }
}


export const resetPassword=(password,token)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type:USER_PASSWORD_RESET_REQUEST
            })

            let {data} = await axios.post(`/admin/resetpassword`, {password,token}
            )

            dispatch({
                type:USER_PASSWORD_RESET_SUCCESS,
                payload:data
            })



        } catch(error){
            dispatch({
                type:USER_PASSWORD_RESET_FAIL,
                payload:error.response && error.response.data.message ?
                    error.response.data.message :error.message,
            })
        }
    }
}



