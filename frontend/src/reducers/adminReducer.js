import{
    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAIL,
    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_LIST_FAIL,
    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,
    ADMIN_COUNT_REQUEST,
    ADMIN_COUNT_SUCCESS,
    ADMIN_COUNT_FAIL
} from '../constants/adminConstants'


export const addAdminReducer=(state={},action)=>{
    switch(action.type)
    {
        case ADD_ADMIN_REQUEST:{
            return {loading:true}
        }
        case ADD_ADMIN_SUCCESS:{
            return {loading:false, admin:action.payload}
        }
        case ADD_ADMIN_FAIL:{
            return {loading:false,error:action.payload}
        }
        default:{
            return state;
        }
    }
}

export const adminListReducer=(state={},action)=>{
    switch(action.type)
    {
        case ADMIN_LIST_REQUEST:
            return {loading:true}
        case ADMIN_LIST_SUCCESS:{
            return {loading:false,admins:action.payload}
        }
        case ADMIN_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const deleteAdminReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_ADMIN_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_ADMIN_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_ADMIN_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const adminDetailsReducer =(state={},action)=>{
    switch(action.type)
    {
        case ADMIN_DETAILS_REQUEST:{
            return{loading:true}
        }
        case ADMIN_DETAILS_SUCCESS:{
            return{ loading:false, admin:action.payload}
        }
        case ADMIN_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const updateAdminReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_ADMIN_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_ADMIN_SUCCESS:{
            return {updateLoading: false, updatedAdmin:action.payload}
        }
        case UPDATE_ADMIN_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}

export const adminCountReducer = (state={},action)=>{
    switch(action.type){
        case ADMIN_COUNT_REQUEST:{
            return{adminLoading:true}
        }
        case ADMIN_COUNT_SUCCESS:{
            return{adminLoading:false,adminCount:action.payload}
        }
        case ADMIN_COUNT_FAIL:{
            return{adminLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}
