import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addStudentReducer,
    studentListReducer,
    deleteStudentReducer,
    studentProfileReducer,
    updateStudentReducer,
} from "./reducers/studentReducer";

import {
    addBusReducer,
    busListReducer,
    deleteBusReducer,
    busProfileReducer
} from "./reducers/busReducer";

const initialState={

}

const reducer= combineReducers({
    addedStudent:addStudentReducer,
    studentList:studentListReducer,
    studentDelete:deleteStudentReducer,
    studentProfile:studentProfileReducer,
    updatedStudent:updateStudentReducer,
    addedBus:addBusReducer,
    busList:busListReducer,
    busDelete:deleteBusReducer,
    busProfile:busProfileReducer,
})


const middleware=[thunk]


const store= createStore(reducer,initialState,composeWithDevTools(
applyMiddleware(...middleware)
))

export default store;
