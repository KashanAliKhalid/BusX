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


export const addDriverReducer=(state={},action)=>{
    switch(action.type){
        case ADD_DRIVER_REQUEST:
            return {loading:true}
        case ADD_DRIVER_SUCCESS:
            return { loading:false,driver:action.payload}
        case ADD_DRIVER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const driverListReducer=(state={},action)=>{
    switch(action.type)
    {
        case DRIVER_LIST_REQUEST:
            return {loading:true}
        case DRIVER_LIST_SUCCESS:{
            return {loading:false,drivers:action.payload}
        }
        case DRIVER_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}


export const deleteDriverReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_DRIVER_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_DRIVER_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_DRIVER_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const driverProfileReducer =(state={},action)=>{
    switch(action.type)
    {
        case DRIVER_DETAILS_REQUEST:{
            return{loading:true}
        }
        case DRIVER_DETAILS_SUCCESS:{
            return{ loading:false, driver:action.payload}
        }
        case DRIVER_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const updateDriverReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_DRIVER_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_DRIVER_SUCCESS:{
            return {updateLoading: false, updatedDriver:action.payload}
        }
        case UPDATE_DRIVER_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}

export const driverCountReducer = (state={},action)=>{
    switch(action.type){
        case DRIVER_COUNT_REQUEST:{
            return{driverLoading:true}
        }
        case DRIVER_COUNT_SUCCESS:{
            return{driverLoading:false,driverCount:action.payload}
        }
        case DRIVER_COUNT_FAIL:{
            return{driverLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}
