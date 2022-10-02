import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Footer from './component/layout/Footer'
import Header from './component/layout/Header'
import Home from './component/pages/Home'
import Profile from './component/pages/Profile'
import Sign_in from './component/pages/Sign_in'
import Sign_up from './component/pages/Sign_up'
import SearchState from './context/search/SearchState'
import AuthState from './context/auth/AuthState'


import SetauthToken from './utils/SetauthToken'
if(localStorage.token){
    SetauthToken(localStorage.token)
}

const App = () => {
    return (
        <AuthState>
            <SearchState>
                <BrowserRouter>
                    <div>
                        <Header />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/my-profile' component={Profile} />
                                <Route path='/sign-in' component={Sign_in} />
                                <Route path='/sign-up' component={Sign_up} />
                            </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </SearchState>
        </AuthState>
    )
}

export default App
