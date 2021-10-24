import axios from 'axios'
import{
    ADD_ROUTE_REQUEST,
    ADD_ROUTE_SUCCESS,
    ADD_ROUTE_FAIL,
    UPDATE_ROUTE_REQUEST,
    UPDATE_ROUTE_SUCCESS,
    UPDATE_ROUTE_FAIL,
    DELETE_ROUTE_REQUEST,
    DELETE_ROUTE_SUCCESS,
    DELETE_ROUTE_FAIL,
    ROUTE_LIST_REQUEST,
    ROUTE_LIST_SUCCESS,
    ROUTE_LIST_FAIL,
    ROUTE_DETAILS_REQUEST,
    ROUTE_DETAILS_SUCCESS,
    ROUTE_DETAILS_FAIL,
    ROUTE_COUNT_REQUEST,
    ROUTE_COUNT_SUCCESS,
    ROUTE_COUNT_FAIL
} from '../constants/routeConstants'



export const addRoute=(route)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_ROUTE_REQUEST,
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/admin/route', route,config)

            dispatch({
                type:ADD_ROUTE_SUCCESS,
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
                type:ADD_ROUTE_FAIL,
                payload:message
            })
        }
    }
}

export const routeList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:ROUTE_LIST_REQUEST
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
                var {data} = await axios.get('/admin/allroutes',config)
            }
            else{
                var {data} = await axios.get(url.toString(),config)

            }

            dispatch({
                type:ROUTE_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:ROUTE_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}


export const deleteRoute=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_ROUTE_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.delete(`/admin/route/${id}`,config)
            dispatch({
                type:DELETE_ROUTE_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_ROUTE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const getRoute=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ROUTE_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/admin/route/${id}`,config)
            dispatch({
                type:ROUTE_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:ROUTE_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const updateRoute=(id,route)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_ROUTE_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/admin/route/${id}`,route,config)
            dispatch({
                type:UPDATE_ROUTE_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_ROUTE_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const countStudent=()=>{
    return async(dispatch,getState)=>{
        try{
            dispatch({
                type:ROUTE_COUNT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const count=await axios.get('/admin/data/studentcount',config)
            dispatch({
                type:ROUTE_COUNT_SUCCESS,
                payload:count
            })
        }
        catch (error) {
            dispatch({
                type:ROUTE_COUNT_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


