import axios from 'axios'
import{
    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAIL,
    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_LIST_FAIL,
    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,
    ADMIN_COUNT_REQUEST,
    ADMIN_COUNT_SUCCESS,
    ADMIN_COUNT_FAIL
} from '../constants/adminConstants'



export const addAdmin=(admin)=>{
    console.log(admin)
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_ADMIN_REQUEST,
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/superadmin/admin', admin,config)

            dispatch({
                type:ADD_ADMIN_SUCCESS,
                payload:data
            })
        }
        catch(error)
        {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            dispatch({
                type:ADD_ADMIN_FAIL,
                payload:message
            })
        }
    }
}


export const adminList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:ADMIN_LIST_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            if(!url)
            {
                var {data} = await axios.get('/superadmin/alladmins',config)
            }
            else{
                var {data} = await axios.get(url.toString(),config)

            }

            dispatch({
                type:ADMIN_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:ADMIN_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}


export const deleteAdmin=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_ADMIN_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.delete(`/superadmin/admin/${id}`,config)
            dispatch({
                type:DELETE_ADMIN_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_ADMIN_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const getAdmin=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADMIN_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/superadmin/admin/${id}`,config)
            dispatch({
                type:ADMIN_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:ADMIN_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const updateAdmin=(id,admin)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_ADMIN_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/superadmin/admin/${id}`,admin,config)
            dispatch({
                type:UPDATE_ADMIN_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_ADMIN_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}
