import axios from 'axios'
import{
    ADD_COMPLAINT_REQUEST,
    ADD_COMPLAINT_SUCCESS,
    ADD_COMPLAINT_FAIL,
    UPDATE_COMPLAINT_REQUEST,
    UPDATE_COMPLAINT_SUCCESS,
    UPDATE_COMPLAINT_FAIL,
    DELETE_COMPLAINT_REQUEST,
    DELETE_COMPLAINT_SUCCESS,
    DELETE_COMPLAINT_FAIL,
    COMPLAINT_LIST_REQUEST,
    COMPLAINT_LIST_SUCCESS,
    COMPLAINT_LIST_FAIL,
    COMPLAINT_DETAILS_REQUEST,
    COMPLAINT_DETAILS_SUCCESS,
    COMPLAINT_DETAILS_FAIL,
    COMPLAINT_COUNT_REQUEST,
    COMPLAINT_COUNT_SUCCESS,
    COMPLAINT_COUNT_FAIL
} from '../constants/complaintConstants'



export const complaintList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:COMPLAINT_LIST_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            if(url)
            {
                var {data} = await axios.get(url.toString(),config)
            }
            else
            {
                var {data} = await axios.get('/admin/allcomplaints',config)

            }
            dispatch({
                type:COMPLAINT_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:COMPLAINT_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}
