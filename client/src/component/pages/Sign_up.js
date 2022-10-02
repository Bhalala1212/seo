import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'
const Sign_up = props => {
    const {sign_up, token, loaduser}  = useContext(AuthContext)
    
    useEffect(() => {
        if(!token) {
            loaduser()
        }
        if(token) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    }, [token])
    
    const [user, Setuser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = e => {
        Setuser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = e => {
        e.preventDefault()
        sign_up(user)
    }

    return (
        <div className="container">
            <div className="sign">
                <div className="sign__box">
                    <form onSubmit={HandleSubmit}>
                        <input onChange={handleChange} type="text" name="name" className="input__feild feild" placeholder="Full Name" />
                        <input onChange={handleChange} type="email" name="email" className="input__feild feild" placeholder="example@mail.com" />
                        <input onChange={handleChange} type="password" name="password" className="input__feild feild" placeholder="password" />
                        <button type="submit" className="submit__feild feild">sign up</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Sign_up
