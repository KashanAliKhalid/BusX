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
} from '../constants/busConstants'
import {
    DELETE_STUDENT_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    STUDENT_DETAILS_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_LIST_FAIL,
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS
} from "../constants/studentConstants";

export const addBusReducer=(state={},action)=>{
    switch(action.type)
    {
        case ADD_BUS_REQUEST:{
            return {loading:true}
        }
        case ADD_BUS_SUCCESS:{
            return {loading:false, bus:action.payload}
        }
        case ADD_BUS_FAIL:{
            return {loading:false,error:action.payload}
        }
        default:{
            return state;
        }
    }
}


export const busListReducer=(state={},action)=>{
    switch(action.type)
    {
        case BUS_LIST_REQUEST:
            return {loading:true}
        case BUS_LIST_SUCCESS:{
            return {loading:false,buses:action.payload}
        }
        case BUS_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}



export const deleteBusReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_BUS_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_BUS_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_BUS_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const busProfileReducer =(state={},action)=>{
    switch(action.type)
    {
        case BUS_DETAILS_REQUEST:{
            return{loading:true}
        }
        case BUS_DETAILS_SUCCESS:{
            return{ loading:false, bus:action.payload}
        }
        case BUS_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}
