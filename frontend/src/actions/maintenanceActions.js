import{
    ADD_MAINTENANCE_REQUEST,
    ADD_MAINTENANCE_SUCCESS,
    ADD_MAINTENANCE_FAIL,
    UPDATE_MAINTENANCE_REQUEST,
    UPDATE_MAINTENANCE_SUCCESS,
    UPDATE_MAINTENANCE_FAIL,
    DELETE_MAINTENANCE_REQUEST,
    DELETE_MAINTENANCE_SUCCESS,
    DELETE_MAINTENANCE_FAIL,
    MAINTENANCE_LIST_REQUEST,
    MAINTENANCE_LIST_SUCCESS,
    MAINTENANCE_LIST_FAIL,
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,
    MAINTENANCE_DETAILS_FAIL,
    MAINTENANCE_COUNT_REQUEST,
    MAINTENANCE_COUNT_SUCCESS,
    MAINTENANCE_COUNT_FAIL
} from '../constants/maintenanceConstants'
import axios from 'axios'


export const addMaintenance=(Maintenance)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_MAINTENANCE_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/admin/maintenance',Maintenance,config)
            dispatch({
                type:ADD_MAINTENANCE_SUCCESS,
                payload:data,
            })
        }
        catch(error)
        {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            dispatch({
                type:ADD_MAINTENANCE_FAIL,
                payload:message
            })
        }
    }
}


export const maintenanceList=(url)=>{
    console.log(url)
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:MAINTENANCE_LIST_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            let {data} = await axios.get(url.toString(),config)
            console.log(data)

            dispatch({
                type:MAINTENANCE_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:MAINTENANCE_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}

export const deleteMaintenance=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_MAINTENANCE_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.delete(`/admin/maintenance/${id}`,config)
            dispatch({
                type:DELETE_MAINTENANCE_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_MAINTENANCE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const getMaintenance=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:MAINTENANCE_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/admin/maintenance/${id}`,config)
            dispatch({
                type:MAINTENANCE_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:MAINTENANCE_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}
