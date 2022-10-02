import React, {useContext, useEffect} from 'react'
import Avatar from '../layout/avatar.png'
import AuthContext from '../../context/auth/AuthContext'
const Profile = props => {
    const {isAuthenticated, loaduser, user, sign_out} = useContext(AuthContext)
    
    useEffect(() => {
        if(!isAuthenticated) {
            props.history.push('/');
        }
        loaduser()
        // eslint-disable-next-line
    }, [isAuthenticated])

    
    return (
    
        <div className="container">
            <div className="profile">
                <div className="profile__image">
                    <img  src={Avatar} alt="..." />
                </div>
                <div className="profile__info">
                    <h2>{user && user.name}</h2>
                    <p>joined at: {user && user.cleatedAt}</p>
                    <p onClick={e => sign_out()} ><span className="sign__out">sign out</span>  </p>
                </div>
            </div>

            {
                user && user.history !== null ? (
                    <div className="history">
                        <div className="history_list">
                            <div className="history_list__all">
                                <div className="keywordList__heading">
                                    <h3>search history</h3>
                                </div>
                                <ul>
                                    {
                                        user.history.map((value, index) => (
                                            <li key={index}>{value}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
            
    )
}

export default Profile
