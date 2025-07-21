import { Outlet } from "react-router-dom";

const Root = ()=>{
    return (
        <div>
            <h1>Welcome to the Event Scheduler</h1>
            <p>This is the root component of your application.</p>
            <Outlet/>
        </div>
    )
}
export default Root;