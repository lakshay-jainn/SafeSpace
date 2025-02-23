import useGlobalAuth from "@/Auth/useGlobalAuth";
import { Outlet,Navigate,useLocation } from "react-router-dom";
function ProtectedRoute(){
    
    const {isLoggedIn}=useGlobalAuth()
    const location = useLocation()
    
        if (!isLoggedIn){
            console.log('redirecting to auth')
            return (<Navigate to='/auth' replace state={{ from: location }} />)
        }
        return (<Outlet />)

    
}
export default ProtectedRoute
