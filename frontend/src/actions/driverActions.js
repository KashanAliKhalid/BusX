import{
    ADD_DRIVER_REQUEST,
    ADD_DRIVER_SUCCESS,
    ADD_DRIVER_FAIL,
    UPDATE_DRIVER_REQUEST,
    UPDATE_DRIVER_SUCCESS,
    UPDATE_DRIVER_FAIL,
    DELETE_DRIVER_REQUEST,
    DELETE_DRIVER_SUCCESS,
    DELETE_DRIVER_FAIL,
    DRIVER_LIST_REQUEST,
    DRIVER_LIST_SUCCESS,
    DRIVER_LIST_FAIL,
    DRIVER_DETAILS_REQUEST,
    DRIVER_DETAILS_SUCCESS,
    DRIVER_DETAILS_FAIL,
    DRIVER_COUNT_REQUEST,
    DRIVER_COUNT_SUCCESS,
    DRIVER_COUNT_FAIL
} from '../constants/driverConstants'
import axios from 'axios'
import {BUS_COUNT_FAIL, BUS_COUNT_REQUEST, BUS_COUNT_SUCCESS} from "../constants/busConstants";



export const addDriver=(Driver)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_DRIVER_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/admin/data/driver',Driver,config)
            dispatch({
                type:ADD_DRIVER_SUCCESS,
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
                type:ADD_DRIVER_FAIL,
                payload:message
            })
        }
    }
}

export const driverList=(url)=>{
    return async(dispatch,getState)=>{
        console.log(url)
        try {
            dispatch({
                type:DRIVER_LIST_REQUEST
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
                type:DRIVER_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:DRIVER_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}

export const deleteDriver=(id)=>{
    return async (dispatch,getState)=>{
        console.log(id)
        try{
            dispatch({
                type:DELETE_DRIVER_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.delete(`/admin/data/driver/${id}`,config)
            dispatch({
                type:DELETE_DRIVER_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_DRIVER_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const getDriver=(id)=>{
    return async (dispatch,getState)=>{
        console.log(id)
        try{
            dispatch({
                type:DRIVER_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/admin/data/driver/${id}`,config)
            dispatch({
                type:DRIVER_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:DRIVER_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const updateDriver=(id,driver)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_DRIVER_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/admin/data/driver/${id}`,driver,config)
            dispatch({
                type:UPDATE_DRIVER_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_DRIVER_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const countDriver=()=>{
    return async(dispatch,getState)=>{
        try{
            dispatch({
                type:DRIVER_COUNT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const count=await axios.get('/admin/data/drivercount',config)
            dispatch({
                type:DRIVER_COUNT_SUCCESS,
                payload:count
            })
        }
        catch (error) {
            dispatch({
                type:DRIVER_COUNT_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

