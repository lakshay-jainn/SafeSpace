// ProtectedAction.js
import useGlobalAuth from "@/Auth/useGlobalAuth";
const ProtectedAction = ({ children }:{children:any}) => {
    const { openLogin,isLoggedIn} = useGlobalAuth()!;
    const handleCheck=(event:any)=>{
        if (!isLoggedIn){
            event.preventDefault();
            event.stopPropagation();
            openLogin();
        }
    }
    return (
        <div onClickCapture={handleCheck}>
            {children}
        </div>
    );
};

export default ProtectedAction;
