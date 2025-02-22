import useGlobalAuth from "@/Auth/useGlobalAuth";

import { Outlet,Navigate } from "react-router-dom";
function ProtectedRoute(){
    
    const {isLoggedIn}=useGlobalAuth()

        if (!isLoggedIn){
            return (<Navigate to='/auth/login' replace />)
        }
        return (<Outlet />)

    
}
export default ProtectedRoute
