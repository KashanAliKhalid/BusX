import{
    ADD_LICENSE_REQUEST,
    ADD_LICENSE_SUCCESS,
    ADD_LICENSE_FAIL,
    UPDATE_LICENSE_REQUEST,
    UPDATE_LICENSE_SUCCESS,
    UPDATE_LICENSE_FAIL,
    DELETE_LICENSE_REQUEST,
    DELETE_LICENSE_SUCCESS,
    DELETE_LICENSE_FAIL,
    LICENSE_LIST_REQUEST,
    LICENSE_LIST_SUCCESS,
    LICENSE_LIST_FAIL,
    LICENSE_DETAILS_REQUEST,
    LICENSE_DETAILS_SUCCESS,
    LICENSE_DETAILS_FAIL,
    LICENSE_COUNT_REQUEST,
    LICENSE_COUNT_SUCCESS,
    LICENSE_COUNT_FAIL
} from '../constants/licenseConstants'




export const addLicenseReducer=(state={},action)=>{
    switch(action.type)
    {
        case ADD_LICENSE_REQUEST:{
            return {loading:true}
        }
        case ADD_LICENSE_SUCCESS:{
            return {loading:false, license:action.payload}
        }
        case ADD_LICENSE_FAIL:{
            return {loading:false,error:action.payload}
        }
        default:{
            return state;
        }
    }
}

export const licenseListReducer=(state={},action)=>{
    switch(action.type)
    {
        case LICENSE_LIST_REQUEST:
            return {loading:true}
        case LICENSE_LIST_SUCCESS:{
            return {loading:false,licenses:action.payload}
        }
        case LICENSE_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const deleteLicenseReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_LICENSE_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_LICENSE_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_LICENSE_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const licenseDetailsReducer =(state={},action)=>{
    switch(action.type)
    {
        case LICENSE_DETAILS_REQUEST:{
            return{loading:true}
        }
        case LICENSE_DETAILS_SUCCESS:{
            return{ loading:false, license:action.payload}
        }
        case LICENSE_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const updateLicenseReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_LICENSE_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_LICENSE_SUCCESS:{
            return {updateLoading: false, updatedLicense:action.payload}
        }
        case UPDATE_LICENSE_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}

export const licenseCountReducer = (state={},action)=>{
    switch(action.type){
        case LICENSE_COUNT_REQUEST:{
            return{licenseLoading:true}
        }
        case LICENSE_COUNT_SUCCESS:{
            return{licenseLoading:false,licenseCount:action.payload}
        }
        case LICENSE_COUNT_FAIL:{
            return{licenseLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}

