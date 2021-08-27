import axios from 'axios'
import{
    ADD_BUS_REQUEST,
    ADD_BUS_SUCCESS,
    ADD_BUS_FAIL,
    UPDATE_BUS_REQUEST,
    UPDATE_BUS_SUCCESS,
    UPDATE_BUS_FAIL,
    DELETE_BUS_REQUEST,
    DELETE_BUS_SUCCESS,
    DELETE_BUS_FAIL,
    BUS_LIST_REQUEST,
    BUS_LIST_SUCCESS,
    BUS_LIST_FAIL,
    BUS_DETAILS_REQUEST,
    BUS_DETAILS_SUCCESS,
    BUS_DETAILS_FAIL,
    BUS_COUNT_REQUEST,
    BUS_COUNT_SUCCESS,
    BUS_COUNT_FAIL
} from '../constants/busConstants'


export const addBus=(bus)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_BUS_REQUEST,
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/admin/data/addbus', bus,config)

            dispatch({
                type:ADD_BUS_SUCCESS,
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
                type:ADD_BUS_FAIL,
                payload:message
            })
        }
    }
}

export const busList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:BUS_LIST_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(url.toString(),config)
            dispatch({
                type:BUS_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:BUS_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}

export const deleteBus=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_BUS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.delete(`/admin/data/deletebus/${id}`,config)
            dispatch({
                type:DELETE_BUS_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_BUS_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}



export const getBus=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:BUS_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}=await axios.get(`/admin/data/updatebusprofile/${id}`,config)
            dispatch({
                type:BUS_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:BUS_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const updateBus=(id,bus)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_BUS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/admin/data/updatebus/${id}`,bus,config)
            dispatch({
                type:UPDATE_BUS_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_BUS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const countBus=()=>{
    return async(dispatch,getState)=>{
        try{
            dispatch({
                type:BUS_COUNT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const count=await axios.get('/admin/data/buscount',config)
            dispatch({
                type:BUS_COUNT_SUCCESS,
                payload:count
            })
        }
        catch (error) {
            dispatch({
                type:BUS_COUNT_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}
