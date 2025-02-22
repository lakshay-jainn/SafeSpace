// ProtectedAction.js
import useGlobalAuth from "@/Auth/useGlobalAuth";
const ProtectedAction = ({ children }:{children:any}) => {
    const {isLoggedIn} = useGlobalAuth()!;
    const handleCheck=(event:any)=>{
        if (!isLoggedIn){
            event.preventDefault();
            event.stopPropagation();
        }
    }
    return (
        <div onClickCapture={handleCheck}>
            {children}
        </div>
    );
};

export default ProtectedAction;
