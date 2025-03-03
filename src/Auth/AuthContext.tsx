import { createContext, useState, useEffect, ReactNode } from "react";
import { setLogout } from "@/api/axios/AuthBridge"
import { Dialog,DialogContent,DialogTitle,DialogDescription } from "@/components/ui/dialog";
import LoginRegisterToggle from "@/pages/login-register/toggle/LoginRegisterToggle";
import axiosClient from "@/api/axios/axiosClient";
import { InitialUserDetailsResponse } from "@/api/types/FeedsTypes";
import { handleApiError } from "@/api/utils/apiUtils";
import { toast } from "sonner";
// Define the type for the context value
type AuthContextType = {
  token: string | null | boolean;
  isLoggedIn: boolean;
  Login : (token : string )=> void;
  Logout: ()=>void;
  handleProtectedAction: (event: any) => void;
  userDetails: InitialUserDetailsResponse | null;
};

// Create the context with an initial value of `null` or a default object
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the type for the AuthProvider props
type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null | boolean>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [actionCallbackFunction, setActionCallbackFunction] = useState<() => void>(() => {});
  const [userDetails,setUserDetails] = useState<InitialUserDetailsResponse | null>(null)
  
  useEffect(()=>{
    if(isLoggedIn){
        const fetchUserDetails = async() =>{
            try{
                const response=await axiosClient.get('/post/user')
              
                const data=response.data;
                
                setUserDetails(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                // toast.error(ErrorResponse.message)
            }
        
        }
        fetchUserDetails();
    }
      
  },[isLoggedIn])

  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken= localStorage.getItem("token");

    if (storedToken) {
            setToken(storedToken);
            GlobalStorage.setToken(storedToken);
            setIsLoggedIn(true);

          }
          else {
            setToken(false)
          }
    
    setLogout(Logout);
    }, []);


  const Logout=()=>{
      localStorage.removeItem("token")
      window.location.reload()
    }
  const Login = (token : string) => {
      localStorage.setItem("token",token)
      // setIsLoggedIn(true)
      // setToken(token)
      // closeLoginPopup();    
      window.location.reload()
      
    }
  const openLoginPopup = () => setIsLoginPopupOpen(true);
  const closeLoginPopup = () => setIsLoginPopupOpen(false);
  
  const handleProtectedAction = (actionCallback : any = () => {}) => {
    if (!isLoggedIn){

        setActionCallbackFunction(()  => actionCallback);
        openLoginPopup();
    } 
    else{
        actionCallback();
    }
  }
  const LoginPopup = () => {
    return (
      <Dialog open={isLoginPopupOpen} onOpenChange={closeLoginPopup}>
        
        <DialogContent>
          <DialogTitle></DialogTitle>
          <LoginRegisterToggle actionCallback={actionCallbackFunction}  />
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
  );
  }
  if (token !== null){

  return (
    <AuthContext.Provider value={{ token, isLoggedIn , Login, Logout , handleProtectedAction,userDetails}}>
      {children}
      <LoginPopup />
    </AuthContext.Provider>
  );
}}

export default AuthProvider;


let token : (string |  null) = null;
export const GlobalStorage = {
  setToken: (argtoken :string ) => { token = argtoken; },
  getToken: () => token,
};
