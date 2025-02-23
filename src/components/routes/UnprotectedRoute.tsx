import useGlobalAuth  from "@/Auth/useGlobalAuth";
import { Outlet,Navigate,useLocation } from "react-router-dom";
function UnprotectedRoute(){
    
    const {isLoggedIn}=useGlobalAuth()!;
    const location = useLocation();
    const from = location.state?.from?.pathname
    if (!isLoggedIn){
        return (
        <Outlet />
    )

    } else{

        return(
        <Navigate to={from ? from : '/feeds'} replace />
    )
    }
}
export default UnprotectedRoute;