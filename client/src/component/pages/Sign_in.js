import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import {Link} from 'react-router-dom'
const Sign_in = props => {
    const {sign_in, token, loaduser}  = useContext(AuthContext)
    const [user, Setuser] = useState({
        email: '',
        password: ''
    })
 
    useEffect(() => {
        if(!token) {
            loaduser()
        }
        if(token) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    }, [token])

    const handleChange = e => {
        Setuser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = e => {
        e.preventDefault()
        sign_in(user)
    }   

    return (
        <div className="container">
            <div className="sign__main">
                <div className="sign">
                    <div className="sign__box">
                        <form onSubmit={HandleSubmit} >
                            <input onChange={handleChange} name="email" type="email" className="input__feild feild" placeholder="example@mail.com" />
                            <input onChange={handleChange} name="password" type="password" className="input__feild feild" placeholder="password" />
                            <button type="submit" className="submit__feild feild">sign in</button>
                        </form>

                    </div>
                </div>
                <div className="sign_up__link">
                    <p>wanna join <Link to="/sign-up"><span className="link__color">sign up 234</span></Link> <span className="link__line"></span> </p>
                </div>
            </div>
        </div>
    )
}

export default Sign_in
