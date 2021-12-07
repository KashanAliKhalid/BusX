import axios from 'axios'
import{
    ADD_LICENSE_REQUEST,
    ADD_LICENSE_SUCCESS,
    ADD_LICENSE_FAIL,
    UPDATE_LICENSE_REQUEST,
    UPDATE_LICENSE_SUCCESS,
    UPDATE_LICENSE_FAIL,
    DELETE_LICENSE_REQUEST,
    DELETE_LICENSE_SUCCESS,
    DELETE_LICENSE_FAIL,
    LICENSE_LIST_REQUEST,
    LICENSE_LIST_SUCCESS,
    LICENSE_LIST_FAIL,
    LICENSE_DETAILS_REQUEST,
    LICENSE_DETAILS_SUCCESS,
    LICENSE_DETAILS_FAIL,
    LICENSE_COUNT_REQUEST,
    LICENSE_COUNT_SUCCESS,
    LICENSE_COUNT_FAIL
} from '../constants/licenseConstants'



export const addLicense=(license)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_LICENSE_REQUEST,
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/superadmin/license', license,config)

            dispatch({
                type:ADD_LICENSE_SUCCESS,
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
                type:ADD_LICENSE_FAIL,
                payload:message
            })
        }
    }
}


export const licenseList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:LICENSE_LIST_REQUEST
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
                var {data} = await axios.get('/superadmin/alllicenses',config)
            }
            else{
                var {data} = await axios.get(url.toString(),config)

            }

            dispatch({
                type:LICENSE_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:LICENSE_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}

export const deleteLicense=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_LICENSE_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.delete(`/superadmin/license/${id}`,config)
            dispatch({
                type:DELETE_LICENSE_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_LICENSE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const getLicense=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:LICENSE_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/superadmin/license/${id}`,config)
            dispatch({
                type:LICENSE_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:LICENSE_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const updateLicense=(id,license)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_LICENSE_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/superadmin/license/${id}`,license,config)
            dispatch({
                type:UPDATE_LICENSE_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_LICENSE_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}
