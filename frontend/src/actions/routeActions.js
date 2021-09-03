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
