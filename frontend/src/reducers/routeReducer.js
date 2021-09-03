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
