export const baseURL = "http://localhost:8080"

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    bookmark : {
        url : '/api/bookmarks',
        method : 'post'
    },
    bookmarks : {
        url : '/api/bookmarks',
        method : 'get'
    },
}
export default SummaryApi