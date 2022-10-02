import React, {useContext, useEffect} from 'react'
import Instakeyword from '../keyword/Instakeyword'
import Keywords from '../keyword/Keywords'
import UsedPages from '../keyword/UsedPages'
import Search from '../search/Search'
import Report from '../url/Report'
import Subdomain from '../url/Subdomain'
import WebKeyword from '../url/WebKeyword'
import Spinner from '../layout/Spinner'
import SearchContext from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'

const Home = () => {
    const {loading, type_keyword, searched}  = useContext(SearchContext)
    const {loaduser } = useContext(AuthContext)
    // if(loading) return <Spinner />

    useEffect(() => {
        loaduser()
        // eslint-disable-next-line 
    }, [])

    return (
        <div>
            <Search />
            {/* True is keyword | false is domain */}
            
            {   
                searched ? ( // show only if searched
                    loading ? ( // loading call
                        <Spinner />
                    ) : (
                        type_keyword ? ( // keyword type domain or keyword
                            // KEYWORD
                            <div className="container">
                                <div className="MainKeyword">
                                    <Keywords />
                                    <div className="keyword__more">
                                        <UsedPages />
                                        <Instakeyword />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // domain
                            <div className="container">
                                <Report />
                                <div className="search_main">
                                    <WebKeyword />
                                    <Subdomain />
                                </div>
                            </div>
                        )
                    ) // loading end
                ) : null
            }


            {/*  
            <div className="container">
                <div className="MainKeyword">
                    <Keywords />
                    <div className="keyword__more">
                        <UsedPages />
                        <Instakeyword />
                    </div>
                </div>
            </div>
            

            <div className="container">
                <Report />
                <div className="search_main">
                    <WebKeyword />
                    <Subdomain />
                </div>
            </div>
            */}
        </div>
    )
}

export default Home
