export default (state, action) => {
    switch(action.type){

        case 'REPORT': 
            return {
                ...state,
                report: action.payload,
                loading: false
            }

        case 'SUBDOMAINS': 
            return {
                ...state,
                subdomain: action.payload,
                loading: false
            }
        case 'DOMAIN_KEYWORD': 
            return {
                ...state,
                webkeywords: action.payload,
                loading: false
            }


        case 'INSTA_KEYWORD': 
            return {
                ...state,
                instakeywords: action.payload,
                loading: false
            }
        case 'PAGE_USED': 
            return {
                ...state,
                pageused: action.payload,
                loading: false
            }
        case 'MAIN_KEYWORDS': 
            return {
                ...state,
                keywords: action.payload,
                loading: false
            }

        case 'SET_SEARCHED': 
            return {
                ...state,
                searched: true
            }
        case 'SET_TYPE': 
            return {
                ...state,
                type_keyword: action.payload
            }  
        case 'SET_LOADING': 
            return {
                ...state,
                loading: true
            }  
        default:
            return state
    }
}