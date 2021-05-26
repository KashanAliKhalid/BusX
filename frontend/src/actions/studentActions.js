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
} from '../constants/studentConstants'

export const addStudent=(student)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type:ADD_STUDENT_REQUEST
            })

            const {data}= await axios.post('/admin/data/addStudent',student,{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
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
    return async(dispatch)=>{
        console.log(url)
        try {
            dispatch({
                type:STUDENT_LIST_REQUEST
            })
            const {data} = await axios.get(url.toString())
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

