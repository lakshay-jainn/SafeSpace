import { AuthContext } from "@/Auth/AuthContext";
import { useContext} from "react";
import { Outlet,Navigate } from "react-router-dom";
function ProtectedRoute(){
    
    const {isLoggedIn}=useContext(AuthContext)!;

    if (isLoggedIn){
        return (<Outlet />)

    }else{
        return(<Navigate to='/auth/login' replace />)
    }
}
export default ProtectedRoute
