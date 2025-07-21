import { createBrowserRouter } from "react-router-dom";
import Root from "../Component/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
   {
    path: "/",
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:[
         {
            path:"/",
            element:<Home></Home>
         }
    ]}
   
])
export default router;