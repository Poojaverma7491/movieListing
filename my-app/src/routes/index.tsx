import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home";
import Register from "../Pages/register";
import Login from "../Pages/login";
import Detail from "../Pages/details";
import BookMark from "../Pages/bookMark";
import App from "../App";
import MovieGrid from "../Components/MovieGrid";
const AllRoutes = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                index: true, 
                element: <Home />
            },
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