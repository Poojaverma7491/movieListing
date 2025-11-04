import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import MovieGrid from "../components/movieGrid";
import Detail from "../pages/details";
import BookMark from "../pages/bookMark";
import App from "../App";
const AllRoutes = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "home",
                element : <Home/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "/home/movie/search/popular",
                element : <MovieGrid category={"movie"}/>
            },
            {
                path : "/home/movie/search/top_rated",
                element : <MovieGrid category={"movie"}/>
            },
            {
                path : "/home/tv/search/popular",
                element : <MovieGrid category={"tv"}/>
            },
            {
                path : "/home/tv/search/top_rated",
                element : <MovieGrid category={"tv"}/>
            },
            {
                path : "/home/:category/:id",
                element : <Detail/>
            },
            {
                path : "/bookmarks",
                element : <BookMark/>
            },
            {
                path : "/home/movie",
                element : <MovieGrid category={"movie"}/>
            },
            {
                path : "/home/tv",
                element : <MovieGrid category={"tv"}/>
            },
            {
                path : "/home/:category/genre/:genreId",
                element : <MovieGrid category={"tv"}/>
            },
            {
                path : "/home/:category/search/:keyword",
                element : <MovieGrid category={"movie"}/>
            },

        ]
    }
])
export default AllRoutes