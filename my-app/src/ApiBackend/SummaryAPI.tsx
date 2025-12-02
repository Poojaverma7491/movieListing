const BASE_URL = process.env.REACT_APP_API_URL;
const SummaryApi = {
    user: { 
        url: `${BASE_URL}/api/user`, 
        method: "get" 
    },
    googleLogin: { 
        url: `${BASE_URL}/api/user/google-login`, 
        method: "post" 
    },
    logout: { 
        url: `${BASE_URL}/api/user/logout`, 
        method: "post" 
    },
    bookmark : {
        url : `${BASE_URL}/api/bookmarks`,
        method : 'post'
    },
    bookmarks : {
        url : `${BASE_URL}/api/bookmarks`,
        method : 'get'    
    },
    
}
export default SummaryApi
