import  ReactDOM  from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./views/Home/Home.js";
import "./index.css";
import Singup from "./views/Singup/Singup.js";
import Login from "./views/Login/Login.js";
import Buy from "./views/Buy/Buy.js"

const router = createBrowserRouter([
    {
        "path":"/",
        "element":<Home/>

    },

    {
        "path":"/singup",
        "element":<Singup/>
    },
    {
        "path":"/login",
        "element":<Login/>
    },
    {
        "path": "/buy/:id",
        "element":<Buy/>
    }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <>
  < RouterProvider router = { router } />
    
    </>
);