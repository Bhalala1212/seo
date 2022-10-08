import React, {useContext} from 'react'
import Avatar from './avatar.png'
import Logo from './Mediya-01.png'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
const Header = () => {
    const {token} = useContext(AuthContext)
    return (
        <div>
            <header>
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo scan" />
                    </Link>
                </div>
                {
                    token && token ? (
                        <Link to="/my-profile" className="avatar">
                            <img width="30" src={Avatar}  alt="avatar of each user" />
                        </Link>
                    ) : (
                        <Link to="/sign-in"><button>sign in</button></Link>
                    )
                }
            </header>
        </div>
    )
}

export default Header
