import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addStudentReducer,studentListReducer} from "./reducers/studentReducer";

const initialState={

}

const reducer= combineReducers({
    addedStudent:addStudentReducer,
    studentList:studentListReducer
})


const middleware=[thunk]


const store= createStore(reducer,initialState,composeWithDevTools(
applyMiddleware(...middleware)
))

export default store;
