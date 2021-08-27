import axios from 'axios'
import{
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,
    STUDENT_COUNT_REQUEST,
    STUDENT_COUNT_SUCCESS,
    STUDENT_COUNT_FAIL
} from '../constants/studentConstants'
import {BUS_COUNT_FAIL, BUS_COUNT_REQUEST, BUS_COUNT_SUCCESS} from "../constants/busConstants";

export const addStudent=(student)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_STUDENT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}= await axios.post('/admin/data/addStudent',student,config)
            dispatch({
                type:ADD_STUDENT_SUCCESS,
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
                type:ADD_STUDENT_FAIL,
                payload:message
            })
        }
    }
}

export const studentList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:STUDENT_LIST_REQUEST
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
                type:STUDENT_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:STUDENT_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}

export const deleteStudent=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_STUDENT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.delete(`/admin/data/deletestudent/${id}`,config)
            dispatch({
                type:DELETE_STUDENT_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_STUDENT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const getStudent=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:STUDENT_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/admin/data/updatestudentprofile/${id}`,config)
            dispatch({
                type:STUDENT_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:STUDENT_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const updateStudent=(id,student)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_STUDENT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/admin/data/updatestudent/${id}`,student,config)
            dispatch({
                type:UPDATE_STUDENT_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_STUDENT_FAIL,
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
                type:STUDENT_COUNT_REQUEST
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
                type:STUDENT_COUNT_SUCCESS,
                payload:count
            })
        }
        catch (error) {
            dispatch({
                type:STUDENT_COUNT_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

