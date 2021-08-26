import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT} from "../constants/userConstants";
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
            console.log(userType,remember)
            if(userType === 'Admin') {
                const {data} = await axios.post('/admin/login',
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
            }
            else if(userType==='Super Admin')
                console.log("super admin")





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
