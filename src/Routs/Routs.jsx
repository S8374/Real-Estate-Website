import {
    createBrowserRouter

  } from "react-router-dom";
import Root from "../Components/Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Components/Pages/Home/Home";
import Details from "../Components/Pages/Details/Details";
import Property from "../Components/Pages/Property/Property";
import Private from "../Private/Private";
import Profile from "../Components/Pages/Profile/Profile";

 
  const Routs = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
     children:[
        {
          path:'/',
          element:<Home></Home>
        }
        ,
        {
          path: '/details/:id', // Route with id parameter
          element: <Private><Details></Details></Private>  // Render the Details page

        },
        {
          path:'/properties',
          element: <Private><Property></Property></Private>
        },
        {

          path:'/Profile',
          element: <Private><Profile></Profile></Private>
        }
     ]
    },
    
  ]);
  
  export default Routs;