export default (state, action) => {
    switch(action.type){
        case 'USER':
            return {
                ...state,
                isAuthenticated: true,                
                user: action.payload,
                loading: false
            }
        case 'SIGN_IN':
        case 'SIGN_UP':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case 'SIGN_OUT':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: true
            }
        case 'SET_LOADING': // SETINF THE LOADING
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}