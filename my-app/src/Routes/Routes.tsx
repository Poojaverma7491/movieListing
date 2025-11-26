import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import App from "../App";
import MovieGrid from "../Components/Catalog/MovieGrid";
import BookMark from "../Components/Bookmark/BookMark";
import Detail from "../Components/MovieCard/MovieDetails";
import Login from "../Components/AuthPages/Login";
const Routes = createBrowserRouter([
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
export default Routes