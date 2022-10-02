import React, {useState, useContext} from 'react'
import SearchState from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'
const Search = () => {
    const {searched,setsearched, setType, runkeywords, runalldomains} = useContext(SearchState)
    const {isAuthenticated, history} = useContext(AuthContext)
    
    const [text, setText] = useState('')
    
    const isURL = string => {
        const pattern = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)
        // eslint-disable-next-line
        const res = string.match(pattern)
        return (res !== null)
    };

    const handleSubmit = e => {
        e.preventDefault()
        
        if(text === ''){

        }else if(isURL(text)){
            let url
            url = text.replace("/url?q=", "").split("&")[0];
            url = url.replace(/(https?:\/\/)?(www.)?/i, '');            
            url = url.split('/')[0];
            setText(url)
            
            // console.log(`https://${url}`)
            // const url = new URL(text)
            // console.log(url.origin)
            setsearched()
            setType(false)
            runalldomains(`https://${url}`)

            if(isAuthenticated){
                history(`https://${url}`)
            }
            
        }else{
            setsearched()
            setType(true)
            runkeywords(text)
            if(isAuthenticated){
                history(text)
            }
        }

    }

    return (
        <>  
            {
                searched ? (
                    <div className="search">
                        <div className="search__main">
                            <form onSubmit={handleSubmit}>
                                <input onChange={e => setText(e.target.value)} value={text}  className="search__input" type="text" placeholder=" Enter keyword or url" />
                                <button className="small__btn">Go</button>
                                <button className="small__large">search</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="searchCenter">
                        <div className="search__main">
                            <form onSubmit={handleSubmit}>
                                <input onChange={e => setText(e.target.value)} value={text} className="search__input" type="text" placeholder=" Enter keyword or url" />
                                <button className="small__btn">Go</button>
                                <button className="small__large">search</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Search
