import * as api from '../Api/index'
import { currentuser } from './currentuser.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




//login-action
export const login = (authdata, nav) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authdata)
        console.log(data)
        dispatch({ type: 'AUTH', data })
        dispatch(currentuser(JSON.parse(localStorage.getItem('profile'))))
        toast.success("successfully login..", {
            position: toast.POSITION.TOP_CENTER,
        })
        nav("/");

    } catch (err) {
        toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

//signup-action
export const sign_up = (authdata, nav) => async (dispatch) => {
    console.log(authdata)
    try {
        const { data } = await api.signUp(authdata)
        dispatch({ type: 'AUTH', data })
        dispatch(currentuser(JSON.parse(localStorage.getItem('profile'))))
        toast.success("successfully signup..", {
            position: toast.POSITION.TOP_CENTER,
        })
        nav("/");
    } catch (err) {
        toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
        })
    }

}

//forget-pw-action
export const forgetPw = (email) => async (dispatch) => {
    console.log(email)
    try {
        const { data } = await api.forget(email)
        dispatch({ type: 'FORGET', data });
        toast.success("Successfully sent the reset link!! Check your mail", {
            position: toast.POSITION.TOP_CENTER,
        })
    } catch (error) {
        toast.error(error.response.data.status, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}