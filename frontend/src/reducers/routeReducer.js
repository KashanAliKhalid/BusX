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
import {
    DELETE_DRIVER_FAIL,
    DELETE_DRIVER_REQUEST,
    DELETE_DRIVER_SUCCESS, DRIVER_COUNT_FAIL,
    DRIVER_COUNT_REQUEST, DRIVER_COUNT_SUCCESS,
    DRIVER_DETAILS_FAIL,
    DRIVER_DETAILS_REQUEST,
    DRIVER_DETAILS_SUCCESS,
    DRIVER_LIST_FAIL,
    DRIVER_LIST_REQUEST,
    DRIVER_LIST_SUCCESS,
    UPDATE_DRIVER_FAIL,
    UPDATE_DRIVER_REQUEST,
    UPDATE_DRIVER_SUCCESS
} from "../constants/driverConstants";

export const addRouteReducer=(state={},action)=>{
    switch(action.type)
    {
        case ADD_ROUTE_REQUEST:{
            return {loading:true}
        }
        case ADD_ROUTE_SUCCESS:{
            return {loading:false, route:action.payload}
        }
        case ADD_ROUTE_FAIL:{
            return {loading:false,error:action.payload}
        }
        default:{
            return state;
        }
    }
}

export const routeListReducer=(state={},action)=>{
    switch(action.type)
    {
        case ROUTE_LIST_REQUEST:
            return {loading:true}
        case ROUTE_LIST_SUCCESS:{
            return {loading:false,routes:action.payload}
        }
        case ROUTE_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const deleteRouteReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_ROUTE_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_ROUTE_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_ROUTE_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const routeDetailsReducer =(state={},action)=>{
    switch(action.type)
    {
        case ROUTE_DETAILS_REQUEST:{
            return{loading:true}
        }
        case ROUTE_DETAILS_SUCCESS:{
            return{ loading:false, route:action.payload}
        }
        case ROUTE_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const updateRouteReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_ROUTE_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_ROUTE_SUCCESS:{
            return {updateLoading: false, updatedRoute:action.payload}
        }
        case UPDATE_ROUTE_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}

export const routeCountReducer = (state={},action)=>{
    switch(action.type){
        case DRIVER_COUNT_REQUEST:{
            return{routeLoading:true}
        }
        case DRIVER_COUNT_SUCCESS:{
            return{routeLoading:false,routeCount:action.payload}
        }
        case DRIVER_COUNT_FAIL:{
            return{routeLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}
