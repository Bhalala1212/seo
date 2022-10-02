import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import SearchState from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'

const Keywords = () => {
    const {token} = useContext(AuthContext)
    const {keywords} = useContext(SearchState)
    return (
        <>
            <div className="keywords">
                <div className="keyword__list">
                    <div className="keywordList__heading">
                        <h3>Related keywords</h3>
                    </div>
                    {
                        token ? (
                            <ul>
                                {
                                    keywords.map((value,index) => {
                                        return <li key={index}>{value}</li>
                                    }) 
                                }
                            </ul>
                        ): (
                            <ul>
                                {
                                    keywords.slice(0, 11).map((value,index) => {
                                        return <li key={index}>{value}</li>
                                    }) 
                                }
                                <li className="sign_in__load"><Link to="/sign-in"> <span>sign in</span> to load more </Link>  </li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Keywords
