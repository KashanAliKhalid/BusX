import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addStudentReducer,
    studentListReducer,
    deleteStudentReducer,
    studentProfileReducer,
    updateStudentReducer,
    studentCountReducer
} from "./reducers/studentReducer";

import {
    addBusReducer,
    busListReducer,
    deleteBusReducer,
    busProfileReducer,
    updateBusReducer,
    busCountReducer
} from "./reducers/busReducer";

import {
    addDriverReducer,
    driverListReducer,
    deleteDriverReducer,
    driverProfileReducer,
    updateDriverReducer,
    driverCountReducer

} from "./reducers/driverReducer"


import {
    userLoginReducer,
    updateUserReducer,
    userProfileReducer,
    forgotPasswordReducer, resetPasswordReducer

} from "./reducers/userReducer";

import {
    addRouteReducer,
    routeListReducer,
    deleteRouteReducer,
    routeDetailsReducer,
    updateRouteReducer,
    routeCountReducer,
} from "./reducers/routeReducer";

let userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

if(userInfoFromStorage===null)
   userInfoFromStorage= sessionStorage.getItem('userInfo')
        ? JSON.parse(sessionStorage.getItem('userInfo'))
        :null

const initialState={
    userLogin: { userInfo: userInfoFromStorage },
}

const reducer= combineReducers({
    addedStudent:addStudentReducer,
    studentList:studentListReducer,
    studentDelete:deleteStudentReducer,
    studentProfile:studentProfileReducer,
    updatedStudent:updateStudentReducer,
    studentCount:studentCountReducer,

    addedBus:addBusReducer,
    busList:busListReducer,
    busDelete:deleteBusReducer,
    busProfile:busProfileReducer,
    updatedBus:updateBusReducer,
    busCount:busCountReducer,

    addedDriver:addDriverReducer,
    driverList:driverListReducer,
    driverDelete:deleteDriverReducer,
    driverProfile:driverProfileReducer,
    updatedDriver:updateDriverReducer,
    driverCount:driverCountReducer,

    userLogin:userLoginReducer,
    updatedUser:updateUserReducer,
    userProfile:userProfileReducer,
    forgotPassword:forgotPasswordReducer,
    resetPassword:resetPasswordReducer,

    addedRoute:addRouteReducer,
    routeList:routeListReducer,
    routeDelete:deleteRouteReducer,
    routeDetails:routeDetailsReducer,
    updatedRoute:updateRouteReducer,
    routeCount:routeCountReducer,

})


const middleware=[thunk]


const store= createStore(reducer,initialState,composeWithDevTools(
applyMiddleware(...middleware)
))

export default store;
