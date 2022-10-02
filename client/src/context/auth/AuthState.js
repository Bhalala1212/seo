import React, {useReducer} from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import axios from 'axios';

// send headers with requests
import SetauthToken from '../../utils/SetauthToken'

const AuthState = props => {
    const InitState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: false
    }
    const [state, dispatch] = useReducer(AuthReducer, InitState)
    //---------------------------------------------------

    // CHECK USER | loaduser
    const loaduser = async () => {
        if(localStorage.token){
            SetauthToken(localStorage.token)
        }
        try {
            setloading()
            const res = await axios.get('/api/v1/user')
            dispatch({
                type: 'USER',
                payload: res.data.user
            })
        } catch (err) {
            console.log(err) 
        }
    }


    // sign_up
    const sign_up = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setloading()
            const res = await axios.post(`/api/v1/sign-up`, user, config)
            dispatch({
                type: 'SIGN_UP',
                payload: res.data
            })
            loaduser()
        } catch (err) {
            console.log(err)
        }
    }

    // sign_in
    const sign_in = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setloading()
            const res = await axios.post(`/api/v1/sign-in`, user, config)
            dispatch({
                type: 'SIGN_IN',
                payload: res.data
            })
            loaduser()
        } catch (err) {
            console.log(err)
        }
    }


    const history = async word => {
        try {
            await axios.get(`/api/v1/history?word=${word}`)
            
        } catch (err) {
            console.log(err)
        }
    }


    // sign_out
    const sign_out = () => {
        dispatch({
            type: 'SIGN_OUT'
        })
    }

    const setloading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }
    //---------------------------------------------------
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            sign_up,
            sign_in,
            sign_out,
            loaduser,
            history
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState


