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

export const complaintListReducer=(state={},action)=>{
    switch(action.type)
    {
        case COMPLAINT_LIST_REQUEST:
            return {loading:true}
        case COMPLAINT_LIST_SUCCESS:{
            return {loading:false,complaints:action.payload}
        }
        case COMPLAINT_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}
