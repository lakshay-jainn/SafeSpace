import {useContext} from 'react';
import { AuthContext } from './AuthContext';

export default function useGlobalAuth(){
    const { token, isLoggedIn, Login ,Logout,openLogin,closeLogin,isLoginOpen}=useContext(AuthContext)!;
    return { token, isLoggedIn, Login ,Logout,openLogin,closeLogin,isLoginOpen};
}