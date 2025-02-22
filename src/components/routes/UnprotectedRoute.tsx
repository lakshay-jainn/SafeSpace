import useGlobalAuth  from "@/Auth/useGlobalAuth";
import { Outlet,Navigate } from "react-router-dom";
function UnprotectedRoute(){
    
    const {isLoggedIn}=useGlobalAuth()!;
    if (!isLoggedIn){
        return (<Outlet />)

    }else{
        
        return(<Navigate to='/feeds' replace />)
    }
}
export default UnprotectedRoute;