import {
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



export const updateBusReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_BUS_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_BUS_SUCCESS:{
            return {updateLoading: false, updatedBus:action.payload}
        }
        case UPDATE_BUS_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}

export const busCountReducer = (state={},action)=>{
    switch(action.type){
        case BUS_COUNT_REQUEST:{
            return{busLoading:true}
        }
        case BUS_COUNT_SUCCESS:{
            return{busLoading:false,busCount:action.payload}
        }
        case BUS_COUNT_FAIL:{
            return{busLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}
