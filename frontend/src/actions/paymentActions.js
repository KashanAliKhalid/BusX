import axios from 'axios'
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


export const addPayment=(payment)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:ADD_PAYMENT_REQUEST,
            })
            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data}= await axios.post('/superadmin/payment', payment,config)

            dispatch({
                type:ADD_PAYMENT_SUCCESS,
                payload:data
            })
        }
        catch(error)
        {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            dispatch({
                type:ADD_PAYMENT_FAIL,
                payload:message
            })
        }
    }
}

export const paymentList=(url)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:PAYMENT_LIST_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }


                let {data} = await axios.get(url.toString(),config)


            dispatch({
                type:PAYMENT_LIST_SUCCESS,
                payload:data
            })
        }
        catch (error) {
            dispatch({
                type:PAYMENT_LIST_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}

export const deletePayment=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:DELETE_PAYMENT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.delete(`/superadmin/payment/${id}`,config)
            dispatch({
                type:DELETE_PAYMENT_SUCCESS,
            })
        }
        catch(error)
        {
            dispatch({
                type:DELETE_PAYMENT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const getPayment=(id)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:PAYMENT_DETAILS_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.get(`/superadmin/payment/${id}`,config)
            dispatch({
                type:PAYMENT_DETAILS_SUCCESS,
                payload:data
            })
        }
        catch (error)
        {
            dispatch({
                type:PAYMENT_DETAILS_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const updatePayment=(id,payment)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch({
                type:UPDATE_PAYMENT_REQUEST
            })

            const {userLogin:{userInfo}}=getState()

            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.patch(`/superadmin/payment/${id}`,payment,config)
            dispatch({
                type:UPDATE_PAYMENT_SUCCESS,
                payload:data
            })
        }
        catch(error){
            dispatch({
                type:UPDATE_PAYMENT_FAIL,
                payload:error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

