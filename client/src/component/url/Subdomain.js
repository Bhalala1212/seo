import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import SearchState from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'

const Subdomain = () => {
    const {token} = useContext(AuthContext)

    const {subdomain} = useContext(SearchState)

    return (
        <div className="sub_domain">
            <div className="sub_domains_all">
                <div className="sub_domain_list">
                    <div className="keywordList__heading">
                        <h3>Available sub Domains</h3>
                    </div>
                    {
                        token ? (
                            <ul>
                                {
                                    subdomain.map((value,index) =>{
                                        return <li key={index}><a target="blank" href={`https://${value}`}>{value}</a></li>
                                    })
                                }
                            </ul>
                        ):(
                            <ul>
                                {
                                    subdomain.slice(0,5).map((value,index) =>{
                                        return <li key={index}><a target="blank" href={`https://${value}`}>{value}</a></li>
                                    })
                                }
                                <li className="sign_in__load"><Link to="/sign-in"> <span>sign in</span> to load more </Link>  </li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Subdomain
