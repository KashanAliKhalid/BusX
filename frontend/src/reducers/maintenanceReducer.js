import{
    ADD_MAINTENANCE_REQUEST,
    ADD_MAINTENANCE_SUCCESS,
    ADD_MAINTENANCE_FAIL,
    UPDATE_MAINTENANCE_REQUEST,
    UPDATE_MAINTENANCE_SUCCESS,
    UPDATE_MAINTENANCE_FAIL,
    DELETE_MAINTENANCE_REQUEST,
    DELETE_MAINTENANCE_SUCCESS,
    DELETE_MAINTENANCE_FAIL,
    MAINTENANCE_LIST_REQUEST,
    MAINTENANCE_LIST_SUCCESS,
    MAINTENANCE_LIST_FAIL,
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,
    MAINTENANCE_DETAILS_FAIL,
    MAINTENANCE_COUNT_REQUEST,
    MAINTENANCE_COUNT_SUCCESS,
    MAINTENANCE_COUNT_FAIL
} from '../constants/maintenanceConstants'


export const addMaintenanceReducer=(state={},action)=>{
    switch(action.type){
        case ADD_MAINTENANCE_REQUEST:
            return {loading:true}
        case ADD_MAINTENANCE_SUCCESS:
            return { loading:false,maintenance:action.payload}
        case ADD_MAINTENANCE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const maintenanceListReducer=(state={},action)=>{
    switch(action.type)
    {
        case MAINTENANCE_LIST_REQUEST:
            return {loading:true}
        case MAINTENANCE_LIST_SUCCESS:{
            return {loading:false,maintenance:action.payload}
        }
        case MAINTENANCE_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}


export const deleteMaintenanceReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_MAINTENANCE_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_MAINTENANCE_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_MAINTENANCE_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const maintenanceDetailsReducer =(state={},action)=>{
    switch(action.type)
    {
        case MAINTENANCE_DETAILS_REQUEST:{
            return{loading:true}
        }
        case MAINTENANCE_DETAILS_SUCCESS:{
            return{ loading:false, maintenance:action.payload}
        }
        case MAINTENANCE_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}



