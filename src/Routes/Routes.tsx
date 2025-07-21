import { createBrowserRouter } from "react-router-dom";
import Root from "../Component/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import RegisterPage from "../Pages/Register/Register";
import SignIn from "../Pages/SignIn/SIgInPage";

const router = createBrowserRouter([
   {
    path: "/",
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:[
         {
            path:"/",
            element:<Home></Home>
         },
         {
            path:"/signup",
            element:<RegisterPage></RegisterPage>
         },
         {
            path:"/signin",
            element:<SignIn></SignIn>
         }
    ]}
   
])
export default router;