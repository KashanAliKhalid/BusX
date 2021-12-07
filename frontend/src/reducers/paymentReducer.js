import{
    ADD_PAYMENT_REQUEST,
    ADD_PAYMENT_SUCCESS,
    ADD_PAYMENT_FAIL,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAIL,
    DELETE_PAYMENT_REQUEST,
    DELETE_PAYMENT_SUCCESS,
    DELETE_PAYMENT_FAIL,
    PAYMENT_LIST_REQUEST,
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_SUCCESS,
    PAYMENT_DETAILS_FAIL,
} from '../constants/paymentConstants'


export const addPaymentReducer=(state={},action)=>{
    switch(action.type)
    {
        case ADD_PAYMENT_REQUEST:{
            return {loading:true}
        }
        case ADD_PAYMENT_SUCCESS:{
            return {loading:false, payment:action.payload}
        }
        case ADD_PAYMENT_FAIL:{
            return {loading:false,error:action.payload}
        }
        default:{
            return state;
        }
    }
}

export const paymentListReducer=(state={},action)=>{
    switch(action.type)
    {
        case PAYMENT_LIST_REQUEST:
            return {loading:true}
        case PAYMENT_LIST_SUCCESS:{
            return {loading:false,payments:action.payload}
        }
        case PAYMENT_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const deletePaymentReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_PAYMENT_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_PAYMENT_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_PAYMENT_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const paymentDetailsReducer =(state={},action)=>{
    switch(action.type)
    {
        case PAYMENT_DETAILS_REQUEST:{
            return{loading:true}
        }
        case PAYMENT_DETAILS_SUCCESS:{
            return{ loading:false, payment:action.payload}
        }
        case PAYMENT_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const updatePaymentReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_PAYMENT_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_PAYMENT_SUCCESS:{
            return {updateLoading: false, updatedPayment:action.payload}
        }
        case UPDATE_PAYMENT_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}


