import{
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,
} from '../constants/studentConstants'


export const addStudentReducer=(state={},action)=>{
switch(action.type){
    case ADD_STUDENT_REQUEST:
        return {loading:true}
    case ADD_STUDENT_SUCCESS:
        return { loading:false,student:action.payload}
    case ADD_STUDENT_FAIL:
        return {loading:false,error:action.payload}
    default:
        return state
}
}

export const studentListReducer=(state={},action)=>{
    switch(action.type)
    {
        case STUDENT_LIST_REQUEST:
            return {loading:true}
        case STUDENT_LIST_SUCCESS:{
            return {loading:false,students:action.payload}
        }
        case STUDENT_LIST_FAIL:{
            return {loading:false, error:action.payload}
        }
        default:
            return state
    }
}


export const deleteStudentReducer =(state={deleting:false},action)=>{
    switch(action.type)
    {
        case DELETE_STUDENT_REQUEST:{
            return {deleting:true}
        }
        case(DELETE_STUDENT_SUCCESS):{
            return{deleting:false, success:true}
        }
        case(DELETE_STUDENT_FAIL): {
            return{deleting:false,error:action.payload}
        }
        default:
            return state
    }
}

export const studentProfileReducer =(state={},action)=>{
    switch(action.type)
    {
        case STUDENT_DETAILS_REQUEST:{
            return{loading:true}
        }
        case STUDENT_DETAILS_SUCCESS:{
            return{ loading:false, student:action.payload}
        }
        case STUDENT_DETAILS_FAIL:{
            return{loading:false, error:action.payload}
        }
        default:
            return state
    }
}

export const updateStudentReducer =(state={}, action)=>{
    switch(action.type)
    {
        case UPDATE_STUDENT_REQUEST:{
            return {updateLoading:true}
        }
        case UPDATE_STUDENT_SUCCESS:{
            return {updateLoading: false, updatedStudent:action.payload}
        }
        case UPDATE_STUDENT_FAIL:{
            return {updateLoading:false, error:action.payload}
        }
        default:
            return state;
    }
}
